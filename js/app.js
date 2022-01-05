var app = new Vue({
    el: '#app',
    data: {
        title: scenario.title,
        subtitle: scenario.subtitle,
        scenario: {
            log: [],
            score: {
                achieved: 0,
                possible: 0
            }
        },
        config: scenario.config,
        node: 0,
        nodes: scenario.nodes,
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
                findIndex: function(nodeId){ // returns the index of a node with the id nodeId
                    for (var nodeIndex in app.nodes){
                        if (app.nodes[nodeIndex].id == nodeId) return nodeIndex
                    }
                    return false
                },
                updateView(){
                    var node = app.nodes[app.node] //define the current node

                    for (var contentIndex in node.contents){ //loop through the options of the current node
                        var content = node.contents[contentIndex] //define the current content object being checked
                        app.fn.conditions.check(content)
                    }

                    for (var optionIndex in node.options){ //loop through the options of the current node
                        var option = node.options[optionIndex] //define the current option object being checked 
                        app.fn.conditions.check(option)
                    }
                },
                tests: {
                    visitCount: function(node){
                        return node.visitCount
                    }
                },
                events: {
                    exit: function(){
                        app.scenario.log.push({
                            node: app.node,
                            notes: app.fn.scenario.log.getNotes(),
                            log: app.fn.scenario.log.getLog()
                        })
                        app.fn.scenario.updateScore()
                    },
                    arrive: function(){
                        app.nodes[app.node].visitCount++
                        app.fn.nodes.updateView()
                    }
                },
                contents: {
                    findIndex: function(contentId){
                        for (var contentIndex in app.nodes[app.node].contents){
                            if (app.nodes[app.node].contents[contentIndex].id == contentId) return contentIndex
                        }
                        return false
                    },
                    p: {
                        tests: {
                            seen: function(el){
                                return el.seen
                            }
                        },
                        getNotes: function(el){
                            return "<p>" + el.text + "</p>"
                        }
                    },
                    h: {
                        tests: {
                            seen: function(el){
                                return el.seen
                            }
                        },
                        getNotes: function(el){
                            return "<p><strong>" + el.text + "</strong></p>"
                        }
                    },
                    img: {
                        tests: {
                            seen: function(el){
                                return el.seen
                            }
                        },
                        getNotes: function(el){
                            return "<a href='img/" + el.path + "' target='_blank' rel='noopener noreferrer'>" + el.title + "</a>"
                        }
                    },
                    inputTextarea: {
                        tests: {
                            seen: function(content){
                                return content.seen
                            },
                            keywordFoundCount: function(content){
                                var count = 0
                                for (var keywordIndex in content.keywords){
                                    if (content.keywords[keywordIndex].found) count++
                                }
                                return count
                            },
                            keywordIsFound: function(content, keywordId){
                                for (var keywordIndex in content.keywords){
                                    if (content.keywords[keywordIndex].found && content.keywords[keywordIndex].id == keywordId) return true
                                }
                            },
                            scorePercentage: function(content){
                                var score = app.fn.nodes.contents.inputTextarea.getScore(content)
                                return (score.achieved/score.possible)*100
                            }
                        },
                        entryTooShort: function(entry){
                            if (entry.length < app.config.nodes.contents.inputTextarea.minLength) return true
                        },
                        getFound: function(content){
                            var found = []
                            for (var keywordIndex in content.keywords){
                                keyword = content.keywords[keywordIndex]
                                if (app.fn.nodes.contents.inputTextarea.tests.keywordIsFound(content, keyword)) found.push(keyword.id)
                            }
                            return found
                        },  
                        getMissed: function(content){
                            var missed = []
                            for (var keywordIndex in content.keywords){
                                keyword = content.keywords[keywordIndex]
                                if (!app.fn.nodes.contents.inputTextarea.tests.keywordIsFound(content, keyword)) missed.push(keyword.id)
                            }
                            return missed
                        },
                        getResponses: function(content){
                            var responses = ""
                            for (var keywordIndex in content.keywords){
                                if (content.keywords[keywordIndex].found){
                                    responses += content.keywords[keywordIndex].response + " "
                                }
                            }
                            return responses
                        },
                        getNotes: function(content){
                            return "<p>" + app.fn.nodes.contents.inputTextarea.getResponses(content) + "</p>"
                        },
                        getLog: function(content){
                            var missed = app.fn.nodes.contents.inputTextarea.getMissed(content)
                            var list = ""
                            for (var index in missed) list += missed[index] + ", "
                            list = list.slice(0,-2)
                            return `
                                <strong>` + content.label + `</strong><br>
                                You entered: <i>'` + content.userEntry + `'</i><br>
                                You found out: <i>` + app.fn.nodes.contents.inputTextarea.getResponses(content) + `</i><br>
                                You could also have considered: <i>` + list + `</i><br>
                                Score: ` + app.fn.nodes.contents.inputTextarea.getScore(content).achieved + `/` + app.fn.nodes.contents.inputTextarea.getScore(content).possible
                        },
                        getScore: function(content){
                            var score = {
                                possible: 0,
                                achieved: 0
                            }
                            var defaultScore = app.config.nodes.contents.inputTextarea.defaultScore
                            for (var keywordIndex in content.keywords){
                                var keywordScore = (content.keywords[keywordIndex].score) ? content.keywords[keywordIndex].score : defaultScore
                                if (keywordScore > 0) score.possible += keywordScore //only add positive scores to possible
                                if (content.keywords[keywordIndex].found) score.achieved += keywordScore
                            }
                            return score
                        },
                        submit: function(contentIndex){ 
                            var node = app.nodes[app.node] // define the current node object
                            var content = node.contents[contentIndex] //define the current content object
                            var entry = content.userEntry // entry = the user's entry within the current textarea content
    
                            if (app.fn.nodes.contents.inputTextarea.entryTooShort(entry)) { // only proceed if entry is long enough
                                app.fn.alerts.askMore()
                                return
                            }
                            
                            if (content.keywords){ //if there is no keyword object then skip directly to show options
                                for (var keywordIndex in content.keywords){ //cycle through each keyword object
                                    for (var triggerIndex in content.keywords[keywordIndex].triggers){ //cycle through each trigger word of the current keyword object
                                        var trigger = content.keywords[keywordIndex].triggers[triggerIndex] //get the current trigger word
                                        if (entry.toLowerCase().includes(trigger)) content.keywords[keywordIndex].found = true //check if trigger word is found in entry (entry.toLowerCase required as includes() is case sensitive)
                                    }
                                }
        
                                if (!app.fn.nodes.contents.inputTextarea.tests.keywordFoundCount(content) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.askMore()
                                    return
                                }
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputTextarea.getResponses(content)) //show the keyword responses for the found keywords
                            }
    
                            app.fn.nodes.updateView() //checks if any content or options on this node should now be shown
                        },
                    },
                    inputCheckbox: {
                        tests: {
                            seen: function(content){
                                return content.seen
                            },
                            checkedCount: function(content){
                                var count = 0
                                for (var checkboxIndex in content.checkboxes){
                                    if (content.checkboxes[checkboxIndex].checked) count++
                                }
                                return count
                            },
                            checkboxIsChecked: function(content, checkboxId){
                                for (var checkboxIndex in content.checkboxes){
                                    if (content.checkboxes[checkboxIndex].checked && content.checkboxes[checkboxIndex].id == checkboxId) return true
                                }
                            },
                            scorePercentage: function(content){
                                var score = app.fn.nodes.contents.inputCheckbox.getScore(content)
                                return (score.achieved/score.possible)*100
                            }
                            
                        },
                        getResponses: function(content){
                            var responses = ""
                            for (var checkboxIndex in content.checkboxes){
                                if (content.checkboxes[checkboxIndex].checked){
                                    responses += content.checkboxes[checkboxIndex].response
                                }
                            }
                            return responses
                        },
                        getChecked: function(content){
                            var checked = []
                            for (var checkboxIndex in content.checkboxes){
                                if (content.checkboxes[checkboxIndex].checked){
                                    checked.push(content.checkboxes[checkboxIndex].title)
                                }
                            }
                            return checked
                        },
                        getMissed: function(content){
                            var missed = []
                            for (var checkboxIndex in content.checkboxes){
                                if (!content.checkboxes[checkboxIndex].checked && content.checkboxes[checkboxIndex].recommended){
                                    missed.push(content.checkboxes[checkboxIndex].title)
                                }
                            }
                            return missed
                        },
                        getNotes: function(content){
                            return "<p>" + app.fn.nodes.contents.inputCheckbox.getResponses(content) + "</p>"
                        },
                        getLog: function(content){
                            var missed = app.fn.nodes.contents.inputCheckbox.getMissed(content)
                            var list = ""
                            for (var index in missed) list += missed[index] + ", "
                            list = list.slice(0,-2)
                            return `
                                <strong>` + content.text + `</strong><br>
                                You selected: <i>'` + app.fn.nodes.contents.inputCheckbox.getChecked(content) + `'</i><br>
                                You found out: <i>` + app.fn.nodes.contents.inputCheckbox.getResponses(content) + `</i><br>
                                You could also have considered: <i>` + list + `</i><br>
                                Score: ` + app.fn.nodes.contents.inputCheckbox.getScore(content).achieved + `/` + app.fn.nodes.contents.inputCheckbox.getScore(content).possible
                        },
                        getScore: function(content){
                            var score = {
                                possible: 0,
                                achieved: 0
                            }
                            var defaultScore = {
                                recommended: app.config.nodes.contents.inputCheckbox.defaultScore.recommended,
                                notRecommended: app.config.nodes.contents.inputCheckbox.defaultScore.notRecommended
                            }
                            for (var checkboxIndex in content.checkboxes){
                                if (content.checkboxes[checkboxIndex].score) {
                                    var checkboxScore = content.checkboxes[checkboxIndex].score //if a custom score is defined use that
                                } else {
                                    var checkboxScore = (content.checkboxes[checkboxIndex].recommended) ? defaultScore.recommended : defaultScore.notRecommended //otherwise use the default score for either recommended or not recommended
                                }
                                if (checkboxScore > 0) score.possible += checkboxScore //only add positive scores to possible
                                if (content.checkboxes[checkboxIndex].checked) score.achieved += checkboxScore
                            }
                            return score
                        },
                        submit: function(contentIndex){
                            var node = app.nodes[app.node]
                            var content = node.contents[contentIndex]
    
                            if (!app.fn.nodes.contents.inputCheckbox.tests.checkedCount(content) > 0) {// only proceed if at least one keyword found
                                app.fn.alerts.checkMore()
                                return
                            }
    
                            app.fn.alerts.showResponse(app.fn.nodes.contents.inputCheckbox.getResponses(content)) //show the checkbox responses for those selected
                            
                            app.fn.nodes.updateView()
    
                            content.disabled = true
                        }
                    }
                },
                options: {
                    findIndex: function(optionTitle){ // returns the index of an option with the title optionTitle within the current node
                        for (var optionIndex in app.nodes[app.node].options){
                            if (app.nodes[app.node].options[optionIndex].title == optionTitle) return optionIndex
                        }
                        return false
                    },
                    tests: {
                        seen: function(option){
                            return option.seen
                        },
                        selectCount: function(option){
                            return option.selectCount
                        },
                        isDisabled: function(option){
                            return option.disabled
                        },
                        isVisible: function(option){
                            return option.visible
                        }
                    }
                }
            },
            scenario: {
                log: {
                    getNotes: function(){
                        var notes = ""
                        for (var contentIndex in app.nodes[app.node].contents){
                            var content = app.nodes[app.node].contents[contentIndex]
                            if (content.excludeFromLog) continue
                            notes += (app.fn.nodes.contents[content.type].getNotes) ? app.fn.nodes.contents[content.type].getNotes(content) : ""
                        }
                        return notes
                    },
                    getLog: function(){
                        var log = ""
                        for (var contentIndex in app.nodes[app.node].contents){
                            var content = app.nodes[app.node].contents[contentIndex]
                            if (content.excludeFromLog) continue
                            log += (app.fn.nodes.contents[content.type].getLog) ? app.fn.nodes.contents[content.type].getLog(content) : app.fn.nodes.contents[content.type].getNotes(content)
                        }
                        return log
                    }
                },
                updateScore: function(){
                    var score = {achieved: 0, possible: 0}
                    for (var nodeIndex in app.nodes){
                        node = app.nodes[nodeIndex]
                        for (contentIndex in node.contents){
                            content = node.contents[contentIndex]
                            if (content.seen) {
                                score.achieved += (app.fn.nodes.contents[content.type].getScore) ? app.fn.nodes.contents[content.type].getScore(content).achieved : 0
                                score.possible += (app.fn.nodes.contents[content.type].getScore) ? app.fn.nodes.contents[content.type].getScore(content).possible : 0
                            }
                        }
                        for (optionIndex in node.options){
                            option = node.options[optionIndex]
                            if (option.selectCount > 0 && option.score) {
                                score.achieved += option.score
                                if (option.score > 0 ) score.possible += option.score
                            }
                        }
                    }
                    app.scenario.score.achieved = score.achieved
                    app.scenario.score.possible = score.possible
                }
            },
            conditions: {
                allMet: function(el){
                    for (var conditionIndex in el.conditions){
                        if (!el.conditions[conditionIndex].met) return false
                    }
                    return true
                },
                check: function(el){ //checks all the conditions of an element (node, content or option object) as el
                    if (!el.conditions){ //if the el has no conditions just go ahead and show it
                        app.fn.conditions.show(el)
                        return true
                    }
                    for (var conditionIndex in el.conditions){ //loop through the conditions of the current el
                        var condition = el.conditions[conditionIndex] //define the current condition being evaluated
                        if (!condition.target.in) condition.target.in = "contents" //if array to search in not defined default to 'contents'
                        condition.target.nodeIndex = (condition.target.nodeName) ? app.fn.nodes.findIndex(condition.target.nodeName) : app.node //if nodeName not given default to current node, has no effect if target in = "nodes"
                        switch (condition.target.in){ //need to switch between different arrays to seach within for target
                            case "nodes":
                                condition.target.index = app.fn.nodes.findIndex(condition.target.id) //get the index of the target node object from its id
                                condition.test.subject = app.nodes[condition.target.index] //create property 'subject' and set it to the targetted node object
                                condition.test.method = app.fn.nodes.tests[condition.test.methodName] //get the test method from the methodName
                                break
                            case "contents":
                                condition.target.index = app.fn.nodes.contents.findIndex(condition.target.id) //get the index of the target content object from its id
                                condition.test.subject = app.nodes[condition.target.nodeIndex].contents[condition.target.index] //create property 'subject' and set it to the targetted content object
                                condition.test.method = app.fn.nodes.contents[condition.test.subject.type].tests[condition.test.methodName] //get the test method from the methodName
                                break
                            case "options":
                                condition.target.index = app.fn.nodes.options.findIndex(condition.target.id) //get the index of the target option object from its id
                                condition.test.subject = app.nodes[condition.target.nodeIndex].option[condition.target.index] //create property 'subject' and set it to the targetted option object
                                condition.test.method = app.fn.nodes.options.tests[condition.test.methodName] //get the test method from the methodName
                                break
                        }
                        app.fn.conditions.runTest(condition)
                    }
                    if (app.fn.conditions.allMet(el)) {
                        app.fn.conditions.show(el)
                    }
                },
                runTest: function(condition){ //runs the test for a given condition, sets condition.met = true if condition is met
                    var result = condition.test.method(condition.test.subject, condition.test.require)
                    switch (condition.test.operator){
                        case ">":
                            condition.met = result > condition.test.require
                            break
                        case "<":
                            condition.met = result < condition.test.require
                            break
                        case "=":
                            condition.met = result === condition.test.require
                            break
                        default:
                            condition.met = result //if no operator then default to methodResult must be true for condition to be met
                    }
                },
                show: function(el){ //sets an element to be visible and seen, parameter el should be an object within nodes[].options[] or nodes[].content
                    el.visible = true
                    el.seen = true
                }
            }
        }
    },
    methods: {
        testFn: function(){ // temporary function

        },
        clickOption: function(optionIndex = 0){
            var option = this.nodes[this.node].options[optionIndex]
            var goTo = (option.goTo) ? app.fn.nodes.findIndex(option.goTo) : this.node + 1 // if a goTo is specified find the index for that node, otherwise provide index for next node
            console.log("Option '" + option.title + "' selected: goTo '" + this.nodes[goTo].id + "'")
            option.selectCount++
            if (option.onceOnly) option.disabled = true
            this.fn.nodes.events.exit()
            this.node = goTo
            this.fn.nodes.events.arrive()
        }
    },
    beforeCreate() {
        for (var nodeIndex in scenario.nodes){
            var node = scenario.nodes[nodeIndex]
            node.visitCount = 0 //create 'visitCount' property for each node object, start as 0
            if (node.contents){
                for (var contentIndex in node.contents){
                    content = node.contents[contentIndex]
                    content.seen = false //create 'seen' property for each content object, start as false
                    if (content.type.includes('input')) content.submitCount = 0 //create 'submitCount' property for each content object which is an input, start as 0
                    if (content.type == 'inputTextarea') content.userEntry = "" //create 'userEntry' property for inputTextarea content type to allow v-bind to work
                    content.disabled = false //create 'disabled' property for each content object, start as false
                    content.visible = (content.conditions) ? false : true //create 'visible' property for each content object, set as false if content has conditions to start hidden
                }
            }
            if (node.options){
                for (var optionIndex in node.options){
                    option = node.options[optionIndex]
                    option.seen = false //create 'seen' property for each option object, start as false
                    option.selectCount = 0 //create 'selectCount' property for each option object, start as 0
                    if (!option.class) option.class = {'btn-primary': true} //if property 'class' not defined for each option object, create property and set as 'btn-primary'
                    option.disabled = false //create 'disabled' property for each option object, set as false initially
                    option.visible = (option.conditions) ? false : true //create 'visible' property for each option object, set as false if the option object has conditions to start hidden
                }
            }
        }
        scenario.nodes[0].visitCount++ //arrive event does not run for start node, so increment manually
    }
})

app.fn.nodes.updateView() //runs after app created, to ensure appropriate check of conditions and setting seen properties for node 0

