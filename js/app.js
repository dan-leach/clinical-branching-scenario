var app = new Vue({
    el: '#app',
    data: {
        title: "Neonatal Sepsis",
        subtitle: "A responsive branching clinical scenario dealing with decision making on the topic of early-onset sepsis.",
        scenario: {
            log: [],
            score: {
                achieved: 0,
                possible: 0
            }
        },
        config: {
            inputs: {
                textarea: {
                    minLength: 10,
                    defaultScore: 10
                }
            },
            imgModal: ""
        },
        node: 0,
        nodes: nodes,
        fn: {
            alerts: {
                askMore: function(){
                    Swal.fire({
                        icon: 'error',
                        title: 'Try again...',
                        text: 'You didn\'t find much out that time. Is there anything else you want to ask?'
                    })
                },
                checkMore: function(){
                    Swal.fire({
                        icon: 'error',
                        title: 'Try again...',
                        text: 'You need to select at least one option'
                    })
                },
                showResponse: function(res){
                    Swal.fire({
                        icon: 'info',
                        title: 'Here\'s what you find out:',
                        text: res,
                        footer: 'You can now continue, or ask more questions if you want to know more.'
                    })
                }
            },
            nodes: {
                findIndex: function(nodeName){ // returns the index of a node with the name nodeName
                    for (var nodeIndex in app.nodes){
                        if (app.nodes[nodeIndex].name == nodeName) return nodeIndex
                    }
                    return false
                },
                events: {
                    exit: function(){
                        app.scenario.log.push({
                            node: app.node,
                            notes: app.fn.scenario.log.getNotes(),
                            decisions: app.fn.scenario.log.getDecisions(),
                            feedback: app.fn.scenario.log.getFeedback(),
                            score: app.fn.scenario.log.getScore()
                        })
                    },
                    arrive: function(){

                    }
                },
                contents: {
                    findIndex: function(contentName){
                        for (var contentIndex in app.nodes[app.node].contents){
                            if (app.nodes[app.node].contents[contentIndex].name == contentName) return contentIndex
                        }
                        return false
                    },
                    inputs: {
                        textarea: {
                            isTooShort: function(e){
                                if (e.length < app.config.inputs.textarea.minLength) return true
                            },
                            foundCount: function(input){
                                var count = 0
                                for (var keywordIndex in input.keywords){
                                    if (input.keywords[keywordIndex].found) count++
                                }
                                return count
                            },
                            isFound: function(input, keywordName){
                                for (var keywordIndex in input.keywords){
                                    if (input.keywords[keywordIndex].found && input.keywords[keywordIndex].name == keywordName) return true
                                }
                            },
                            getResponses: function(input){
                                var responses = ""
                                for (var keywordIndex in input.keywords){
                                    if (input.keywords[keywordIndex].found){
                                        responses += input.keywords[keywordIndex].response
                                    }
                                }
                                return responses
                            },
                            getScores: function(input){
                                var score = {
                                    possible: 0,
                                    achieved: 0
                                }
                                var defaultScore = app.config.inputs.textarea.defaultScore
                                var customScore = input.keywords[keywordIndex].score
                                for (var keywordIndex in input.keywords){
                                    var keywordScore = (customScore) ? customScore : defaultScore
                                    if (keywordScore > 0) score.possible += keywordScore //only add positive scores to possible
                                    if (input.keywords[keywordIndex].found) score.achieved += keywordScore
                                }
                                return score
                            },
                            submit: function(contentIndex){ 
                                
                                var node = app.nodes[app.node] // node = the current node object within nodes
                                var input = node.contents[contentIndex] // input = the current content object within the current node
                                var entry = input.userEntry // entry = the user's entry within the current textarea content
        
                                if (app.fn.nodes.contents.inputs.textarea.isTooShort(entry)) { // only proceed if entry is long enough
                                    app.fn.alerts.askMore()
                                    return
                                }
        
                                for (var keywordIndex in input.keywords){ //cycle through each keyword object
                                    for (var triggerIndex in input.keywords[keywordIndex].triggers){ //cycle through each trigger word of the current keyword object
                                        var trigger = input.keywords[keywordIndex].triggers[triggerIndex] //get the current trigger word
                                        if (entry.toLowerCase().includes(trigger)) input.keywords[keywordIndex].found = true //check if trigger word is found in entry (entry.toLowerCase required as includes() is case sensitive)
                                    }
                                }
        
                                if (!app.fn.nodes.contents.inputs.textarea.foundCount(input) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.askMore()
                                    return
                                }
        
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputs.textarea.getResponses(input)) //show the keyword responses for the found keywords
        
                                app.fn.nodes.options.show()
                            },
                        },
                        checkbox: {
                            checkedCount: function(input){
                                var count = 0
                                for (var checkboxIndex in input.checkboxes){
                                    if (input.checkboxes[checkboxIndex].checked) count++
                                }
                                return count
                            },
                            getResponses: function(input){
                                var responses = ""
                                for (var checkboxIndex in input.checkboxes){
                                    if (input.checkboxes[checkboxIndex].checked){
                                        responses += input.checkboxes[checkboxIndex].response
                                    }
                                }
                                return responses
                            },
                            submit: function(contentIndex){
                                var node = app.nodes[app.node]
                                var input = node.contents[contentIndex]
        
                                if (!app.fn.nodes.contents.inputs.checkbox.checkedCount(input) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.checkMore()
                                    return
                                }
        
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputs.checkbox.getResponses(input)) //show the checkbox responses for those selected
                                
                                app.fn.nodes.options.show()
        
                                input.disabled = true
                            }
                        }
                    },
                },
                options: {
                    findIndex: function(optionTitle){ // returns the index of an option with the title optionTitle within the current node
                        for (var optionIndex in app.nodes[app.node].options){
                            if (app.nodes[app.node].options[optionIndex].title == optionTitle) return optionIndex
                        }
                        return false
                    },
                    show: function(){
                        var node = app.nodes[app.node]
                        for (var optionIndex in node.options){
                            var option = node.options[optionIndex]
                            if (!option.conditions) {
                                option.visible = true
                                continue
                            }
                            for (conditionIndex in option.conditions){
                                var condition = option.conditions[conditionIndex]
                                condition.contentIndex = app.fn.nodes.contents.findIndex(condition.contentName)
                                condition.nodeIndex = (condition.nodeName) ? app.fn.nodes.findIndex(condition.nodeName) : app.node //if nodeName not given default to current node
                                condition.subject = app.nodes[condition.nodeIndex].contents[condition.contentIndex]
    
                                if (condition.subject.type == "input"){
                                    condition.test.result = app.fn.nodes.contents.inputs[condition.subject.inputType][condition.test.name](condition.subject, condition.test.requirement)
                                    switch(condition.test.operator){
                                        case ">":
                                            condition.pass = condition.test.result > condition.test.requirement
                                            break
                                        case "<":
                                            condition.pass = condition.test.result < condition.test.requirement
                                            break
                                        case "=":
                                            condition.pass = condition.test.result === condition.test.requirement
                                            break
                                        default:
                                            condition.pass = condition.test.result
                                    }
                                }
                                if (condition.pass) option.visible = true
                            }
                        }
                    },
                }
            },
            scenario: {
                log: {
                    getNotes: function(){
                        var notes = ""
                        for (var contentIndex in app.nodes[app.node].contents){
                            var content = app.nodes[app.node].contents[contentIndex]
                            if (content.excludeFromNotes) continue
                            switch(content.type){
                                case "text":
                                    notes += "<p>" + content.text + "</p>"
                                    break
                                case "img":
                                    notes += "<a href='img/" + content.src + "' target='_blank' rel='noopener noreferrer'>" + content.alt + "</a>"
                                    break
                                case "input":
                                    if (content.inputType == "textarea"){
                                        for (var keywordIndex in content.keywords){
                                            var keyword = content.keywords[keywordIndex]
                                            if (keyword.found) notes += keyword.response + " "
                                        }
                                    } else if (content.inputType == "checkbox"){
                                        for (var checkboxIndex in content.checkboxes){
                                            var checkbox = content.checkboxes[checkboxIndex]
                                            if (checkbox.checked) notes += checkbox.response + " "
                                        }
                                    }
                            }
                        }
                        return notes
                    },
                    getDecisions: function(){
                        return "decisions"
                        /*exit: function(){
                            var n = app.nodes[app.node]
                            var i = n.content[0]
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
                            if (missed) {
                                feedback = "We would have recommended that you also selected: " + missed.toString().replace(/,/gi, ", ") + ". "
                            }
                            if (incorrect) {
                                feedback += "We would not have recommended that you select: " + incorrect.toString().replace(/,/gi, ", ") + ". "
                            }
                            app.scenario.steps.push({
                                node: app.node,
                                decisions: decisions,
                                nodes: i.responses,
                                feedback: feedback,
                                score: n.score
                            })
                        }*/
                    },
                    getFeedback: function(){
                        return "feedback"
                    },
                    getScore: function(){
                        return "score"
                        /*score: {
                            node: {
                                updatePossible: function(addPoints = 10){ //default +10 points
                                    if (addPoints < 0) return //ignore negative marking as best score possible would avoid any negative marks
                                    if (app.nodes[app.node].score) app.nodes[app.node].score.possible += addPoints
                                },
                                updateAchieved: function(addPoints = 10){ //default +10 points
                                    if (app.nodes[app.node].score) app.nodes[app.node].score.achieved += addPoints
                                },
                                reset: function(){
                                    if (app.nodes[app.node].score) {
                                        app.nodes[app.node].score.possible = 0
                                        app.nodes[app.node].score.achieved = 0
                                    }
                                }
                            },
                            cumulative: {
                                updatePossible: function(addPoints){
                                    app.scenario.score.possible += addPoints
                                },
                                updateAchieved: function(addPoints){
                                    app.scenario.score.achieved += addPoints
                                }
                            }
                        },*/
                    }
                }
            }
        }
    },
    methods: {
        testFn: function(){ // temporary function
            
        },
        clickOption: function(optionIndex = 0){
            var option =this.nodes[this.node].options[optionIndex]
            var goTo = (option.goTo) ? app.fn.nodes.findIndex(option.goTo) : this.node + 1 // if a goTo is specified find the index for that node, otherwise provide index for next node
            console.log("Option '" + option.title + "' selected: goTo '" + this.nodes[goTo].name + "'")
            option.selected = true
            if (option.onceOnly) option.disabled = true
            this.fn.nodes.events.exit()
            this.node = goTo
            this.fn.nodes.events.arrive()
        }
    }
})

