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
                            log: app.fn.scenario.log.getLog()
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
                    text: {
                        getNotes: function(input){
                            return "<p>" + input.text + "</p>"
                        }
                    },
                    img: {
                        getNotes: function(input){
                            return "<a href='img/" + input.src + "' target='_blank' rel='noopener noreferrer'>" + input.alt + "</a>"
                        }
                    },
                    inputTextarea: {
                        isTooShort: function(e){
                            if (e.length < app.config.nodes.contents.inputTextarea.minLength) return true
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
                        getMissed: function(input){
                            var missed = []
                            for (var keywordIndex in input.keywords){
                                keyword = input.keywords[keywordIndex]
                                if (!app.fn.nodes.contents.inputTextarea.isFound(input, keyword)) missed.push(keyword.name)
                            }
                            return missed
                        },
                        getResponses: function(input){
                            var responses = ""
                            for (var keywordIndex in input.keywords){
                                if (input.keywords[keywordIndex].found){
                                    responses += input.keywords[keywordIndex].response + " "
                                }
                            }
                            return responses
                        },
                        getNotes: function(input){
                            return "<p>" + app.fn.nodes.contents.inputTextarea.getResponses(input) + "</p>"
                        },
                        getLog: function(input){
                            var missed = app.fn.nodes.contents.inputTextarea.getMissed(input)
                            var list = ""
                            for (var index in missed) list += missed[index] + ", "
                            list = list.slice(0,-2)
                            return `
                                <strong>` + input.label + `</strong><br>
                                You entered: <i>'` + input.userEntry + `'</i><br>
                                You found out: <i>` + app.fn.nodes.contents.inputTextarea.getResponses(input) + `</i><br>
                                You could also have considered: <i>` + list + `</i><br>
                                Score: ` + app.fn.nodes.contents.inputTextarea.getScore(input).achieved + `/` + app.fn.nodes.contents.inputTextarea.getScore(input).possible
                        },
                        getScore: function(input){
                            var score = {
                                possible: 0,
                                achieved: 0
                            }
                            var defaultScore = app.config.nodes.contents.inputTextarea.defaultScore
                            for (var keywordIndex in input.keywords){
                                var keywordScore = (input.keywords[keywordIndex].score) ? input.keywords[keywordIndex].score : defaultScore
                                if (keywordScore > 0) score.possible += keywordScore //only add positive scores to possible
                                if (input.keywords[keywordIndex].found) score.achieved += keywordScore
                            }
                            return score
                        },
                        submit: function(contentIndex){ 
                            
                            var node = app.nodes[app.node] // node = the current node object within nodes
                            var input = node.contents[contentIndex] // input = the current content object within the current node
                            var entry = input.userEntry // entry = the user's entry within the current textarea content
    
                            if (app.fn.nodes.contents.inputTextarea.isTooShort(entry)) { // only proceed if entry is long enough
                                app.fn.alerts.askMore()
                                return
                            }
                            
                            if (input.keywords){ //if there is no keyword object then skip directly to show options
                                for (var keywordIndex in input.keywords){ //cycle through each keyword object
                                    for (var triggerIndex in input.keywords[keywordIndex].triggers){ //cycle through each trigger word of the current keyword object
                                        var trigger = input.keywords[keywordIndex].triggers[triggerIndex] //get the current trigger word
                                        if (entry.toLowerCase().includes(trigger)) input.keywords[keywordIndex].found = true //check if trigger word is found in entry (entry.toLowerCase required as includes() is case sensitive)
                                    }
                                }
        
                                if (!app.fn.nodes.contents.inputTextarea.foundCount(input) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.askMore()
                                    return
                                }
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputTextarea.getResponses(input)) //show the keyword responses for the found keywords
                            }
    
                            app.fn.nodes.options.show()
                        },
                    },
                    inputCheckbox: {
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
                        getChecked: function(input){
                            var checked = []
                            for (var checkboxIndex in input.checkboxes){
                                if (input.checkboxes[checkboxIndex].checked){
                                    checked.push(input.checkboxes[checkboxIndex].label)
                                }
                            }
                            return checked
                        },
                        getNotes: function(input){
                            return "<p>" + app.fn.nodes.contents.inputTextarea.getResponses(input) + "</p>"
                        },
                        getDecisions: function(input){
                            var checked = app.fn.nodes.contents.inputTextarea.getChecked(input)
                            var list = ""
                            for (var index in checked) list += checked[index] + ", "
                            list = list.slice(0,-2)
                            return "<p>" + input.label + " <i>'" + list + "'</i></p>"
                        },
                        submit: function(contentIndex){
                            var node = app.nodes[app.node]
                            var input = node.contents[contentIndex]
    
                            if (!app.fn.nodes.contents.inputCheckbox.checkedCount(input) > 0) {// only proceed if at least one keyword found
                                app.fn.alerts.checkMore()
                                return
                            }
    
                            app.fn.alerts.showResponse(app.fn.nodes.contents.inputCheckbox.getResponses(input)) //show the checkbox responses for those selected
                            
                            app.fn.nodes.options.show()
    
                            input.disabled = true
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
    
                                if (condition.subject.type.includes("input")){
                                    condition.test.result = app.fn.nodes.contents[condition.subject.type][condition.test.name](condition.subject, condition.test.requirement)
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

