"use strict";

var RootComponent = { //create the app instance, import scenario specific data from scenario object
    el: '#app',
    data() {
        return {
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
            fn: { //object containing organised methods
                alerts: { //methods that create an alert
                    askMore: function(){ //creates an alert to encourage the user to add more to their entry
                        Swal.fire({
                            icon: 'error',
                            title: 'Try again...',
                            text: 'You didn\'t find much out that time. Is there anything else you want to ask?'
                        })
                    },
                    checkMore: function(){ //creates an alert for use when user only selects a single checkbox
                        Swal.fire({
                            icon: 'error',
                            title: 'Try again...',
                            text: 'You need to select at least one option'
                        })
                    },
                    showResponse: function(res){ //creates an alert with the text passed as parameter 'res'
                        Swal.fire({
                            icon: 'info',
                            title: 'Here\'s what you find out:',
                            text: res,
                            footer: 'You can now continue, or ask more questions if you want to know more.'
                        })
                    }
                },
                nodes: { //methods relating to node objects or child objects of nodes
                    findIndex: function(nodeId){ //returns the index of a node with the id 'nodeId'
                        for (var nodeIndex in app.nodes){
                            if (app.nodes[nodeIndex].id == nodeId) return parseInt(nodeIndex)
                        }
                        console.warn("Unable to find index of nodeId", nodeId)
                        return false
                    },
                    updateView(){ //called on arriving at a node, and on user input submission - loops through all content and option objects for the current node and checks their conditions for visibility
                        var node = app.nodes[app.node] //define the current node

                        for (var contentIndex in node.contents){ //loop through the options of the current node
                            var content = node.contents[contentIndex] //define the current content object being checked
                            app.fn.conditions.check(content) //check the conditions for the current content object
                        }

                        for (var optionIndex in node.options){ //loop through the options of the current node
                            var option = node.options[optionIndex] //define the current option object being checked 
                            app.fn.conditions.check(option) //check the conditions for the current option object
                        }
                    },
                    tests: { //tests that can form part of a condition for a content or option object where test target is a node
                        visitCount: function(node){
                            return node.visitCount
                        }
                    },
                    events: { //methods called on node level event occurance
                        exit: function(){ //called before leaving a node
                            app.scenario.log.push({ //push an object into the log array 
                                node: app.node, //the index of the node we're leaving
                                notes: app.fn.scenario.log.getNotes(), //generate the casenotes for the node we're leaving - shown in the casenotes panel
                                log: app.fn.scenario.log.getLog() //generate the log with notes, feedback, user inputs and score
                            })
                            app.fn.scenario.updateScore() //update the overall score
                            for (var contentIndex in app.nodes[app.node].contents) app.nodes[app.node].contents[contentIndex].visible = false //set all the contents to be hidden to trigger the fadeout transition
                            for (var optionIndex in app.nodes[app.node].options) app.nodes[app.node].options[optionIndex].visible = false //set all the options to be hidden to trigger the fadeout transition
                        },
                        arrive: function(){ //called after arriving at a node
                            app.nodes[app.node].visitCount++ //keep track of how many times this node has been visited
                            app.fn.nodes.updateView() //check if conditions are met for showing content and options for this node
                        }
                    },
                    contents: { //methods relating to content objects
                        findIndex: function(contentId){ //returns the index of a content object with the id 'contentId'
                            for (var contentIndex in app.nodes[app.node].contents){
                                if (app.nodes[app.node].contents[contentIndex].id == contentId) return parseInt(contentIndex)
                            }
                            console.warn("Unable to find index of contentId", contentId)
                            return false
                        },
                        p: { 
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'p'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with the with text as paragraph
                                return "<p>" + content.text + "</p>"
                            }
                        },
                        h: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'h'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with heading as bold text
                                return "<p><strong>" + content.text + "</strong></p>"
                            }
                        },
                        img: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'img'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string as image title text with link to open the image
                                return "<a href='img/" + content.path + "' target='_blank' rel='noopener noreferrer'>" + content.text + "</a>"
                            }
                        },
                        inputTextarea: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'inputTextarea'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                },
                                keywordFoundCount: function(content){ //returns the number of keywords in object 'content' that have been found by the user
                                    var count = 0
                                    for (var keywordIndex in content.keywords){
                                        if (content.keywords[keywordIndex].found) count++
                                    }
                                    return count
                                },
                                keywordIsFound: function(content, keywordId){ //returns true if keyword with id 'keywordId' in object 'content' has been found
                                    for (var keywordIndex in content.keywords){
                                        if (content.keywords[keywordIndex].found && content.keywords[keywordIndex].id == keywordId) return true
                                    }
                                },
                                scorePercentage: function(content){ //returns the percentage score achieved for object 'content'
                                    var score = app.fn.nodes.contents.inputTextarea.getScore(content) //fetch the score
                                    return (score.achieved/score.possible)*100 //convert to percentage of possible marks
                                }
                            },
                            entryTooShort: function(entry){ //returns true if string 'entry' is less than minimum length defined in config for inputTextarea
                                if (entry.length < app.config.nodes.contents.inputTextarea.minLength) return true
                            },
                            getFound: function(content){ //returns array of IDs of keyword objects which have been found by user in object 'content'
                                var found = []
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    var keyword = content.keywords[keywordIndex] //get the current keyword object
                                    if (app.fn.nodes.contents.inputTextarea.tests.keywordIsFound(content, keyword)) found.push(keyword.id) //if the current keyword object has been found, add its ID to the array to be returned
                                }
                                return found
                            },  
                            getMissed: function(content){ //returns array of IDs of keyword objects which have NOT been found by user in object 'content'
                                var missed = []
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    var keyword = content.keywords[keywordIndex] //get the current keyword object
                                    if (!app.fn.nodes.contents.inputTextarea.tests.keywordIsFound(content, keyword)) missed.push(keyword.id) //if the current keyword object has not been found, add its ID to the array to be returned
                                }
                                return missed
                            },
                            getResponses: function(content){ //returns a string of the responses to keywords which have been found by the user in object 'content'
                                var responses = ""
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    if (content.keywords[keywordIndex].found) responses += content.keywords[keywordIndex].response + " " //if the keyword object has been found, add the response to the responses string, plus a space for separation before next
                                }
                                return responses
                            },
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the casenotes for this node
                                return "<p>" + app.fn.nodes.contents.inputTextarea.getResponses(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.inputTextarea.getMissed(content) //gets an array of missed keywords
                                var list = ""
                                for (var index in missed) list += missed[index] + ", " //create a string of missed keywords separated by , and space
                                list = list.slice(0,-2) //remove the trailing comma and space from the string of missed keywords
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You entered: <i>'` + content.userEntry + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.inputTextarea.getResponses(content) + `</i><br>
                                    You could also have considered: <i>` + list + `</i><br>
                                    Score: ` + app.fn.nodes.contents.inputTextarea.getScore(content).achieved + `/` + app.fn.nodes.contents.inputTextarea.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {
                                    possible: 0,
                                    achieved: 0
                                }
                                var defaultScore = app.config.nodes.contents.inputTextarea.defaultScore //get the default score from config to use if custom score not defined
                                for (var keywordIndex in content.keywords){ //loop through all the keywords
                                    var keywordScore = (content.keywords[keywordIndex].score) ? content.keywords[keywordIndex].score : defaultScore //define the score to be used for this keyword object, use the default score if a custom score is not defined
                                    if (keywordScore > 0) score.possible += keywordScore //only add positive scores to possible as highest score would avoid all negative scores
                                    if (content.keywords[keywordIndex].found) score.achieved += keywordScore
                                }
                                return score
                            },
                            submit: function(contentIndex){ //called by the @click event of the inputTextarea submit button 
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
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'inputCheckbox'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                },
                                checkedCount: function(content){ //returns the number of checkboxes that have been checked in object 'content'
                                    var count = 0
                                    for (var checkboxIndex in content.checkboxes){ //loop through all the checkboxes
                                        if (content.checkboxes[checkboxIndex].checked) count++ //if the current checkbox is found, increment the count
                                    }
                                    return count
                                },
                                checkboxIsChecked: function(content, checkboxId){ //returns true if the checkbox object with ID 'checkboxId' in object 'content' is checked
                                    for (var checkboxIndex in content.checkboxes){ //loop through all the checkboxes
                                        if (content.checkboxes[checkboxIndex].checked && content.checkboxes[checkboxIndex].id == checkboxId) return true
                                    }
                                },
                                scorePercentage: function(content){ //returns the percentage score achieved for object 'content'
                                    var score = app.fn.nodes.contents.inputCheckbox.getScore(content) //get the score object
                                    return (score.achieved/score.possible)*100 //convert to percentage
                                }
                                
                            },
                            getResponses: function(content){ //returns a string of the responses to checkboxes which have been checked by the user in object 'content'
                                var responses = ""
                                for (var checkboxIndex in content.checkboxes){ //loop through all the checkbox objects in the tested object
                                    if (content.checkboxes[checkboxIndex].checked) responses += content.checkboxes[checkboxIndex].response + " " //if the checkbox object has been checked, add the response to the responses string, plus a space for separation before next
                                }
                                return responses
                            },
                            getChecked: function(content){ //returns array of IDs of checkbox objects which have been checked by user in object 'content'
                                var checked = []
                                for (var checkboxIndex in content.checkboxes){ //loop through all the checkbox objects
                                    if (content.checkboxes[checkboxIndex].checked) checked.push(content.checkboxes[checkboxIndex].title) //if the current checkbox object is checked, add its ID to the array to be returned
                                }
                                return checked
                            },
                            getMissed: function(content){ //returns array of IDs of recommended checkbox objects which have NOT been selected by user in object 'content' 
                                var missed = []
                                for (var checkboxIndex in content.checkboxes){ //loop through all the checkbox objects
                                    if (!content.checkboxes[checkboxIndex].checked && content.checkboxes[checkboxIndex].recommended) missed.push(content.checkboxes[checkboxIndex].title) //if the current checkbox object has not been selected but was recommended, add its ID to the array to be returned
                                }
                                return missed
                            },
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the casenotes for this node
                                return "<p>" + app.fn.nodes.contents.inputCheckbox.getResponses(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.inputCheckbox.getMissed(content) //get an array of the IDs of missed checkboxes
                                var list = ""
                                for (var index in missed) list += missed[index] + ", " //create string from array of missed checkboxes, separated by , and space
                                list = list.slice(0,-2) //remove trailing , and space from string of missed checkboxes
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You selected: <i>'` + app.fn.nodes.contents.inputCheckbox.getChecked(content) + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.inputCheckbox.getResponses(content) + `</i><br>
                                    You could also have considered: <i>` + list + `</i><br>
                                    Score: ` + app.fn.nodes.contents.inputCheckbox.getScore(content).achieved + `/` + app.fn.nodes.contents.inputCheckbox.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {
                                    possible: 0,
                                    achieved: 0
                                }
                                var defaultScore = { //get the default scores to be used if custom score not provided
                                    recommended: app.config.nodes.contents.inputCheckbox.defaultScore.recommended,
                                    notRecommended: app.config.nodes.contents.inputCheckbox.defaultScore.notRecommended
                                }
                                for (var checkboxIndex in content.checkboxes){ //loop through all the checkboxes
                                    var checkbox = content.checkboxes[checkboxIndex] //define the current checkbox object
                                    if (checkbox.score) {
                                        var checkboxScore = checkbox.score //if a custom score is defined use that
                                    } else {
                                        var checkboxScore = (checkbox.recommended) ? defaultScore.recommended : defaultScore.notRecommended //otherwise use the default score for either recommended or not recommended
                                    }
                                    if (checkboxScore > 0) score.possible += checkboxScore //only add positive scores to possible
                                    if (checkbox.checked) score.achieved += checkboxScore
                                }
                                return score
                            },
                            submit: function(contentIndex){ //called by the @click event of the inputCheckbox submit button
                                var node = app.nodes[app.node] //define the current node
                                var content = node.contents[contentIndex] //define the inputCheckbox object
        
                                if (!app.fn.nodes.contents.inputCheckbox.tests.checkedCount(content) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.checkMore()
                                    return
                                }
        
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputCheckbox.getResponses(content)) //show the checkbox responses for those selected
                                
                                app.fn.nodes.updateView()
        
                                content.disabled = true
                            }
                        },
                        inputRadio: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'inputRadio'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                },
                                selectedCount: function(content){
                                    if (content.selected) return 1
                                },
                                radioIsSelected: function(content, radioId){ //returns true if the radio object with ID 'radioId' in object 'content' is selected
                                    if (content.selected == radioId) return true
                                },
                                scorePercentage: function(content){ //returns the percentage score achieved for object 'content'
                                    var score = app.fn.nodes.contents.inputRadio.getScore(content) //get the score object
                                    return (score.achieved/score.possible)*100 //convert to percentage
                                }
                                
                            },
                            getResponse: function(content){ //returns a string of the response to the radio which is selected by the user in object 'content'
                                for (var radioIndex in content.radios){ //loop through all the radio objects in the tested object
                                    if (content.radios[radioIndex].id == content.selected) return content.radios[radioIndex].response //if the radio object is selected, return its response
                                }
                                return false
                            },
                            getSelected: function(content){ //returns ID of radio object which is selected by user in object 'content'
                                return content.selected
                            },
                            getMissed: function(content){ //returns ID of recommended radio object which has NOT been selected by user in object 'content'
                                for (var radioIndex in content.radios){ //loop through all the radio objects
                                    if (!app.fn.nodes.contents.inputRadio.tests.radioIsSelected(content.radios[radioIndex].id) && content.radios[radioIndex].recommended) return content.radios[radioIndex].title //if the current radio object has not been selected but was recommended, return its title
                                }
                                return false
                            },
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the casenotes for this node
                                return "<p>" + app.fn.nodes.contents.inputRadio.getResponse(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.inputRadio.getMissed(content) //get an array of the IDs of missed radio
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You selected: <i>'` + app.fn.nodes.contents.inputRadio.getSelected(content) + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.inputRadio.getResponse(content) + `</i><br>
                                    You could also have considered: <i>` + missed + `</i><br>
                                    Score: ` + app.fn.nodes.contents.inputRadio.getScore(content).achieved + `/` + app.fn.nodes.contents.inputRadio.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {possible: 0, achieved: 0}
                                var defaultScore = { //get the default scores to be used if custom score not provided
                                    recommended: app.config.nodes.contents.inputRadio.defaultScore.recommended,
                                    notRecommended: app.config.nodes.contents.inputRadio.defaultScore.notRecommended
                                }
                                for (var radioIndex in content.radios){ //loop through all the radios
                                    var radio = content.radios[radioIndex] //define the current radio object
                                    if (radio.score) {
                                        var radioScore = radio.score //if a custom score is defined use that
                                    } else {
                                        var radioScore = (radio.recommended) ? defaultScore.recommended : defaultScore.notRecommended //otherwise use the default score for either recommended or not recommended
                                    }
                                    if (radioScore > 0) score.possible += radioScore //only add positive scores to possible
                                    if (radio.checked) score.achieved += radioScore
                                }
                                return score
                            },
                            submit: function(contentIndex){ //called by the @click event of the inputRadio submit button
                                var node = app.nodes[app.node] //define the current node
                                var content = node.contents[contentIndex] //define the inputRadio object
        
                                if (!app.fn.nodes.contents.inputRadio.tests.selectedCount(content) > 0) {// only proceed if one selected
                                    app.fn.alerts.checkMore()
                                    return
                                }
        
                                app.fn.alerts.showResponse(app.fn.nodes.contents.inputRadio.getResponse(content)) //show the radio response for that selected
                                
                                app.fn.nodes.updateView()
        
                                content.disabled = true
                            }
                        }
                    },
                    options: { //methods relating to option objects
                        findIndex: function(optionId){ //returns the index of an option with the ID 'optionId' within the current node
                            for (var optionIndex in app.nodes[app.node].options){ //loop through all the option objects
                                if (app.nodes[app.node].options[optionIndex].id == optionId) return parseInt(optionIndex) //returns the current optionIndex if the id matches 'optionId'
                            }
                            console.warn("Unable to find index of optionId", optionId)
                            return false
                        },
                        select: function(optionIndex = 0){ //called by @click event of an option button
                            var option = app.nodes[app.node].options[optionIndex] //define the option object
                            var goTo = (option.goTo) ? app.fn.nodes.findIndex(option.goTo) : app.node + 1 // if a goTo is specified find the index for that node, otherwise provide index for next node
                            console.log("Option '" + option.title + "' selected: goTo '" + app.nodes[goTo].id + "'")
                            option.selectCount++ //increment the counter for the number of times this option has been selected by the user
                            if (option.onceOnly) option.disabled = true //prevent option being selected further times if it has onceOnly property set true
                            app.fn.nodes.events.exit() //call the node exit event
                            setTimeout(function() {
                                app.node = goTo //change to the new node
                                app.fn.nodes.events.arrive() //call the node arrive event
                            }, 500)
                        },
                        tests: { //tests that can form part of a condition for a content or option object where test target is a option object
                            seen: function(option){ //returns true if object 'option' has been seen
                                return option.seen
                            },
                            selectCount: function(option){ //return the number of times object 'option' has been selected
                                return option.selectCount
                            },
                            isDisabled: function(option){ //return true if object 'option' is set to be disabled
                                return option.disabled
                            },
                            isVisible: function(option){ //return true if object 'option' is set to be visible
                                return option.visible
                            }
                        }
                    }
                },
                scenario: {
                    log: {
                        getNotes: function(){ //returns a string with the notes from each content object of the current node
                            var notes = ""
                            for (var contentIndex in app.nodes[app.node].contents){ //loop through all the content objects
                                var content = app.nodes[app.node].contents[contentIndex] //define the current content object
                                if (content.excludeFromLog) continue
                                notes += app.fn.nodes.contents[content.type].getNotes(content) //call the getNotes method for this content object
                            }
                            return notes
                        },
                        getLog: function(){
                            var log = ""
                            for (var contentIndex in app.nodes[app.node].contents){ //loop through all the content objects
                                var content = app.nodes[app.node].contents[contentIndex] //define the current content object
                                if (content.excludeFromLog) continue
                                log += (app.fn.nodes.contents[content.type].getLog) ? app.fn.nodes.contents[content.type].getLog(content) : app.fn.nodes.contents[content.type].getNotes(content) //if this content object has a getLog method use that, otherwise default to the getNotes method
                            }
                            return log
                        }
                    },
                    updateScore: function(){ //updates the scenario.score object with scores for content that has been seen
                        var score = {achieved: 0, possible: 0}
                        for (var nodeIndex in app.nodes){ //loop through all the nodes
                            var node = app.nodes[nodeIndex] //define the current node object 
                            for (var contentIndex in node.contents){ //loop through all the contents of the current node object
                                var content = node.contents[contentIndex] //define the current content object
                                if (content.seen && app.fn.nodes.contents[content.type].getScore) { //if the content has been seen and has a getScore method, use this to update the score
                                    score.achieved += app.fn.nodes.contents[content.type].getScore(content).achieved
                                    score.possible += app.fn.nodes.contents[content.type].getScore(content).possible
                                }
                            }
                            for (var optionIndex in node.options){ //loop through all the options of the current node object
                                var option = node.options[optionIndex] //define the current option object
                                if (option.selectCount > 0 && option.score) { //if the option has been selected at least once and has an associated score update the score
                                    score.achieved += option.score 
                                    if (option.score > 0 ) score.possible += option.score //only add positive scores to possible as best result would avoid negative marks
                                }
                            }
                        }
                        app.scenario.score.achieved = score.achieved
                        app.scenario.score.possible = score.possible
                    }
                },
                conditions: {
                    allMet: function(el){ //returns true if all the conditions for node/content/option object 'el' have been met
                        for (var conditionIndex in el.conditions){ //loop through all the condition objects
                            if (!el.conditions[conditionIndex].met) return false //if any conditions do not have property met set true, return false
                        }
                        return true
                    },
                    check: function(el){ //checks all the conditions for node/content/option object 'el'
                        if (!el.conditions){ //if the el has no conditions just go ahead and show it
                            app.fn.conditions.show(el)
                            return true
                        }
                        for (var conditionIndex in el.conditions){ //loop through the conditions
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
                                    condition.test.subject = app.nodes[condition.target.nodeIndex].options[condition.target.index] //create property 'subject' and set it to the targetted option object
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
        }
    },
    methods: {
        testFn: function(){ // temporary function

        }
    },
    beforeCreate() { //adds properties to objects from scenario that are required for proper functioning of the app logic
        for (var nodeIndex in scenario.nodes){ //loop through all the nodes
            var node = scenario.nodes[nodeIndex] //define the current node object
            node.visitCount = 0 //create 'visitCount' property for each node object, start as 0
            if (node.contents){
                for (var contentIndex in node.contents){ //loop through all the content objects of the current node object
                    var content = node.contents[contentIndex] //define the current content object
                    content.seen = false //create 'seen' property for each content object, start as false
                    if (content.type.includes('input')) content.submitCount = 0 //create 'submitCount' property for each content object which is an input, start as 0
                    if (content.type == 'inputTextarea') content.userEntry = "" //create 'userEntry' property for inputTextarea content type to allow v-bind to work
                    content.disabled = false //create 'disabled' property for each content object, start as false
                    content.visible = false //create 'visible' property for each content object
                }
            }
            if (node.options){
                for (var optionIndex in node.options){ //loop through all the option objects of the current node object
                    var option = node.options[optionIndex] //define the current option object
                    option.seen = false //create 'seen' property for each option object, start as false
                    option.selectCount = 0 //create 'selectCount' property for each option object, start as 0
                    if (!option.class) option.class = {'btn-primary': true} //if property 'class' not defined for each option object, create property and set as 'btn-primary'
                    option.disabled = false //create 'disabled' property for each option object, set as false initially
                    option.visible = false //create 'visible' property for each option object
                }
            }
        }
        scenario.nodes[0].visitCount++ //arrive event does not run for start node, so increment manually
    }
}

const createApp = Vue.createApp(RootComponent)
const app = createApp.mount('#app')

app.fn.nodes.updateView() //runs after app created, to ensure appropriate check of conditions and setting seen properties for node 0

