var app = new Vue({
    el: '#app',
    data: {
        title: "Neonatal Sepsis",
        subtitle: "A responsive branching clinical scenario dealing with decision making on the topic of early-onset sepsis.",
        scenario: {
            steps: [],
            score: {
                achieved: 0,
                possible: 0
            },
            differentials: []
        },
        config: {
            inputs: {
                textarea: {
                    minLength: 10
                }
            },
            imgModal: ""
        },
        node: 0,
        nodes: [
            {
                title: "Welcome",
                content: {
                    text: "This clinical scenario will develop depending on the decisions you make. You will be presented with information which may or may not be relevant. Sometimes you may only be shown important or useful infomation if you specifically ask for it. Try to consider what you would do in your clinical practice during this scenario."
                },
                comment: "Development comments will show here, these will be hidden in the final version.",
                options: [
                    {
                        title: "Next",
                        goTo: function(){
                            return app.node + 1
                        },
                        class: {
                            'btn-primary': true
                        },
                        disabled: false
                    }
                ]
            },
            {
                title: "Case background",
                content: {
                    text: "You are asked to review a 37+3 week gestation male infant on the postnatal ward. He has a birth weight of 3.0kg. He is now 12 hours of age and has a macular rash.",
                    img: {
                        src: "rash.jpg",
                        alt: "Photograph of a infant with a rash",
                        caption: {
                            text: "© Professor Raimo Suhonen/DermNet with permission.",
                            link: "https://dermnetnz.org/imagedetail/17197?copyright=&label=#"
                        }
                    }
                },
                comment: "No input/options for this node, so just next button displayed.",
                options: [
                    {
                        title: "Next",
                        goTo: function(){
                            return app.node + 1
                        },
                        class: {
                            'btn-primary': true
                        },
                        disabled: false
                    }
                ],
                events: {
                    exit: function(){
                        app.scenario.steps.push({
                            node: app.node,
                            notes: app.nodes[app.node].content.text + " <a href='img/" + app.nodes[app.node].content.img.src + "' target='_blank' rel='noopener noreferrer'>" + app.nodes[app.node].content.img.alt + "</a>"
                        })
                    }
                }
            },
            {
                title: "History taking",
                comment: "This node has an input which identifies keywords and then shows responses depending on keywords used.",
                input: {
                    type: "textarea",
                    label: "What would you like to ask about in the history",
                    keywords: [
                        {
                            triggers: ["antenatal", "pregnancy"],
                            response: "This pregnancy was uneventful except for a mild flu-like illness at 34 weeks. ",
                            found: false
                        },
                        {
                            triggers: ["scan", "scans", "ultrasound", "USS"],
                            response: "The antenatal scans were unremarkable. ",
                            found: false
                        },
                        {
                            triggers: ["medication", "drugs", "DHx", "maternal medical", "maternal PMHx"],
                            response: "No maternal medication or signficiant past medical history. ",
                            found: false
                        },
                        {
                            triggers: ["delivery", "birth"],
                            response: "Spontaneous onset of labour. SVD at 37 weeks. ",
                            found: false
                        },
                        {
                            triggers: ["risk factors", "red flags"],
                            response: "There were no risk factors for sepsis. ",
                            found: false
                        },
                        {
                            triggers: ["feeding", "feed", "milk", "breastfeeding", "expressing", "BF", "EBM"],
                            response: "The baby has not really shown any interest in feeding so far. He has been given a couple of syringes of EBM.",
                            found: false
                        }
                    ],
                    entry: "",
                    responses: "",
                    submit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var e = i.entry
                        if (e.length < app.config.inputs.textarea.minLength) { // make sure that length of input is sufficient
                            Swal.fire({
                                icon: 'error',
                                title: 'Try again...',
                                text: 'You need to ask a bit more'
                            })
                            return
                        }
                        for (var x in i.keywords){ //cycle through each keyword object
                            n.score.possible += 10
                            for (var y in i.keywords[x].triggers){ //cycle through each triggers array
                                var kw = (i.keywords[x].triggers[y])
                                if (e.includes(kw)) { //trigger word matched
                                    if (!i.keywords[x].found) { //only add responses for first trigger word match for given keyword
                                        i.keywords[x].found = true
                                        i.responses += i.keywords[x].response
                                        n.score.achieved += 10
                                    }
                                }
                            }
                        }
                        if (i.responses.length == 0){
                            Swal.fire({
                                icon: 'error',
                                title: 'Try again...',
                                text: 'You didn\'t find much out that time. Is there anything else you want to ask?'
                            })
                            return
                        }
                        Swal.fire({
                            icon: 'info',
                            title: 'Here\'s what you find out:',
                            text: i.responses,
                            footer: 'You can now continue, or ask more questions if you want to know more.'
                        })
                        for (var z in n.options){
                            n.options[z].disabled = false
                        }
                    }
                },
                score: {
                    achieved: 0,
                    possible: 0
                },
                options: [
                    {
                        title: "Next",
                        goTo: function(){
                            return app.node + 1
                        },
                        class: {
                            'btn-primary': true
                        },
                        disabled: true
                    }
                ],
                events: {
                    exit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var feedback = "These are the elements from the history that you missed: "
                        for (var x in i.keywords){
                            if (!i.keywords[x].found) {
                                feedback += i.keywords[x].response
                            }
                        }
                        var decisions = "This is the history you asked for: " + i.entry
                        app.scenario.steps.push({
                            node: app.node,
                            decisions: decisions,
                            notes: app.nodes[app.node].input.responses,
                            feedback: feedback,
                            score: n.score 
                        })
                        app.scenario.score.achieved += n.score.achieved
                        app.scenario.score.possible += n.score.possible
                    }
                }
            },
            {
                title: "Examination",
                comment: "This node has an input which identifies keywords and then shows responses depending on keywords used.",
                input: {
                    type: "textarea",
                    label: "What would you like to look for when examining this baby?",
                    keywords: [
                        {
                            triggers: ["airway", "stridor", "grunting", "respiratory", "work of breathing", "WOB", "recession", "tachypnoea", "respiratory rate", "RR", "apnoea", "cyanosis", "cyanosed", "blue", "colour", "oxygen", "hypoxia"],
                            response: "[Response to airway/breathing keyword]. ",
                            found: false
                        },
                        {
                            triggers: ["tachycardia", "heart rate", "HR", "bradycardia", "cap refil", "capillary refil", "CRT", "perfusion", "perfusion", "cool", "cold", "hypothermia", "temperature", "hypotensive", "hypotension"],
                            response: "[Response to cardiovascular keyword]. ",
                            found: false
                        },
                        {
                            triggers: ["floppy", "unresponsive", "tone", "handling", "behaviour", "responsiveness", "encephalopathy", "quiet", "wake", "waking", "irritable", "cry", "crying", "seizure", "fontanelle", "temperature", "fever", "febrile"],
                            response: "[Response to disability keyword] ",
                            found: false
                        }
                    ],
                    entry: "",
                    responses: "",
                    submit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var e = i.entry
                        if (e.length < app.config.inputs.textarea.minLength) { // make sure that length of input is sufficient
                            Swal.fire({
                                icon: 'error',
                                title: 'Try again...',
                                text: 'You need to ask a bit more'
                            })
                            return
                        }
                        for (var x in i.keywords){ //cycle through each keyword object
                            n.score.possible += 10
                            for (var y in i.keywords[x].triggers){ //cycle through each triggers array
                                var kw = (i.keywords[x].triggers[y])
                                if (e.includes(kw)) { //trigger word matched
                                    if (!i.keywords[x].found) { //only add responses for first trigger word match for given keyword
                                        i.keywords[x].found = true
                                        i.responses += i.keywords[x].response
                                        n.score.achieved += 10
                                    }
                                }
                            }
                        }
                        if (i.responses.length == 0){
                            Swal.fire({
                                icon: 'error',
                                title: 'Try again...',
                                text: 'You didn\'t find much out that time. Is there anything else you want to examine for?'
                            })
                            return
                        }
                        Swal.fire({
                            icon: 'info',
                            title: 'Here\'s what you find out:',
                            text: i.responses,
                            footer: 'You can now continue, or ask more questions if you want to know more.'
                        })
                        for (var z in n.options){
                            n.options[z].disabled = false
                        }
                    }
                },
                score: {
                    achieved: 0,
                    possible: 0
                },
                options: [
                    {
                        title: "Next",
                        goTo: function(){
                            return app.node + 1
                        },
                        class: {
                            'btn-primary': true
                        },
                        disabled: true
                    }
                ],
                events: {
                    exit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var feedback = "These are the elements from the examination that you missed: "
                        for (var x in i.keywords){
                            if (!i.keywords[x].found) {
                                feedback += i.keywords[x].response
                            }
                        }
                        var decisions = "This is the examination you performed: " + i.entry
                        app.scenario.steps.push({
                            node: app.node,
                            decisions: decisions,
                            notes: app.nodes[app.node].input.responses,
                            feedback: feedback,
                            score: n.score
                        })
                        app.scenario.score.achieved += n.score.achieved
                        app.scenario.score.possible += n.score.possible
                    }
                }
            },
            {
                title: "Investigations",
                comment: "This node allows the user to select from several options and then show responses depending on the options chosen.",
                input: {
                    type: "checkbox",
                    disabled: false,
                    label: "Select any inital investigations you would like to perform:",
                    checkboxes: [
                        {
                            label: "Set of observations",
                            response: "[Observations]. ",
                            recommended: true
                        },
                        {
                            label: "Blood glucose",
                            response: "[Blood glucose]. ",
                            recommended: true
                        },
                        {
                            label: "Blood gas",
                            response: "[Blood gas]. ",
                            recommended: true
                        },
                        {
                            label: "CXR",
                            response: "[CXR]. ",
                            recommended: false
                        }
                    ],
                    responses: "",
                    submit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var count = 0
                        n.score.achieved = 0
                        n.score.possible = 0
                        for (var x in i.checkboxes){
                            if (i.checkboxes[x].recommended) n.score.possible += 10
                            if(i.checkboxes[x].checked){
                                if (i.checkboxes[x].recommended) {
                                    n.score.achieved += 10
                                } else {
                                    n.score.achieved -= 10
                                }
                                count++
                                i.responses += i.checkboxes[x].response
                            }
                        }
                        if (!count) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Try again...',
                                text: 'You need to select at least one option'
                            })
                            return
                        }
                        Swal.fire({
                            icon: 'info',
                            title: 'Here\'s what you find out:',
                            text: i.responses
                        })
                        i.disabled = true
                        for (var z in n.options){
                            n.options[z].disabled = false
                        }
                    }
                },
                score: {
                    achieved: 0,
                    possible: 0
                },
                options: [
                    {
                        title: "Next",
                        goTo: function(){
                            return app.node + 1
                        },
                        class: {
                            'btn-primary': true
                        },
                        disabled: true
                    }
                ],
                events: {
                    exit: function(){
                        var n = app.nodes[app.node]
                        var i = n.input
                        var missed = []
                        var incorrect = []
                        var decisions = "You selected the following investigations: "
                        for (var x in i.checkboxes){
                            if (i.checkboxes[x].checked) {
                                decisions += i.checkboxes[x].label + ", "
                                if (!i.checkboxes[x].recommended) incorrect.push(i.checkboxes[x].label)
                            } else {
                                if (i.checkboxes[x].recommended) missed.push(i.checkboxes[x].label)
                            }
                        }
                        decisions = decisions.slice(0,-2) + ". "
                        var feedback = ""
                        console.log("missed", missed)
                        console.log("incorrect", incorrect)
                        console.log("decisions", decisions)
                        if (missed) {
                            feedback = "We would have recommended that you also selected: " + missed.toString().replace(/,/gi, ", ") + ". "
                        }
                        if (incorrect) {
                            feedback += "We would not have recommended that you select: " + incorrect.toString().replace(/,/gi, ", ") + ". "
                        }
                        app.scenario.steps.push({
                            node: app.node,
                            decisions: decisions,
                            nodes: app.nodes[app.node].input.responses,
                            feedback: feedback,
                            score: n.score
                        })
                    }
                }
            },
            {
                title: "Differentials",
                content: {
                    text: "Content for node 3"
                }
            },
            {
                title: "Node 4",
                content: {
                    text: "Content for node 4"
                }
            },
            {
                title: "Node 5",
                content: {
                    text: "Content for node 5"
                }
            }
        ]
    },
    methods: {
        goTo: function(node){
            console.log("goTo: " + node)
            if (this.nodes[this.node].events){ //check .event object exists to avoid error
                if (this.nodes[this.node].events.exit) this.nodes[this.node].events.exit() //only calls exit function if it exists
            }
            this.node = node
            if (this.nodes[this.node].events){ //check .event object exists to avoid error
                if (this.nodes[this.node].events.arrive) this.nodes[this.node].events.arrive() //only calls arrive function if it exists
            }
        },
        inputSubmit: function(node){
            this.nodes[this.node].input.submit()
        },
        next: function(){ //for development only
            this.goTo(this.node +1)
        }
    },
    created: function(){
        this.goTo(0)
    }
})

