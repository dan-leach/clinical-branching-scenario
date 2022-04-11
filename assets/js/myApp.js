"use strict";

const myApp = Vue.createApp({ //create the app instance, import scenario specific data from scenario object
    el: '#app',
    data() {
        return {
            title: scenario.title, 
            subtitle: scenario.subtitle,
            scenario: {
                notes: [],
                log: [],
                score: {
                    achieved: 0,
                    possible: 0
                },
                state: scenario.state
            },
            config: scenario.config,
            transitionActive: true,
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
                            if (app.nodes[app.node].addNotesEachVisit || app.nodes[app.node].visitCount === 1){ //only add to case notes after first visit to node, unless node has addNotesEachVisit property
                                app.scenario.notes.push(app.fn.scenario.notes.get()) //get and push a notes object into the notes array
                            }
                            app.scenario.log.push(app.fn.scenario.log.get()) //get and push a log object into the log array
                            app.fn.scenario.updateScore() //update the overall score
                        },
                        arrive: function(){ //called after arriving at a node
                            scroll(0,0) //scroll to the top of the new node
                            app.nodes[app.node].visitCount++ //keep track of how many times this node has been visited
                            app.fn.nodes.updateView() //check if conditions are met for showing content and options for this node
                        }
                    },
                    contents: { //methods relating to content objects
                        findIndex: function(contentId, nodeIndex){ //returns the index of a content object with the id 'contentId'
                            if (!nodeIndex) nodeIndex = app.node
                            for (var contentIndex in app.nodes[nodeIndex].contents) if (app.nodes[nodeIndex].contents[contentIndex].id == contentId) return parseInt(contentIndex)
                            console.warn("Unable to find index of contentId", contentId)
                            return false
                        },
                        text_paragraph: { 
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'p'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with the with text as paragraph
                                return "<p>" + content.text + "</p>"
                            }
                        },
                        text_link: { 
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'p'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with the with text as paragraph
                                return "<a href=" + content.link + "target='_blank' rel='noopener noreferrer'>" + content.text + "</a>"
                            }
                        },
                        text_heading: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'h'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with heading as bold text
                                return "<p><strong>" + content.text + "</strong></p>"
                            }
                        },
                        text_emphasis: { 
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'p'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with the with text as paragraph
                                return "<p>" + content.text + "</p>"
                            }
                        },
                        text_bullets: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'h'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with heading as bold text
                                var list = "<ul>"
                                for (var itemIndex in content.items) list += "<li>" + content.items[itemIndex] + "</li>"
                                list += "</ul>"
                                return "<p>" + content.text + list + "</p>"
                            }
                        },
                        text_numbers: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'h'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string with heading as bold text
                                var list = "<ol>"
                                for (var itemIndex in content.items) list += "<li>" + content.items[itemIndex] + "</li>"
                                list += "</ol>"
                                return "<p>" + content.text + list + "</p>"
                            }
                        },
                        media_image: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'img'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string as image title text with link to open the image
                                return "<a href='scenario/img/" + content.path + "' target='_blank' rel='noopener noreferrer'>" + content.text + "</a>"
                            }
                        },
                        layout_columns: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'img'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns HTML template string as image title text with link to open the image
                                let notes = ""
                                for (let columnIndex in content.columns){
                                    let column = content.columns[columnIndex]
                                    notes += app.fn.nodes.contents[column.type].getNotes(column) //if this content object has a getLog method use that, otherwise default to the getNotes method
                                }
                                return notes
                            },
                            getLog: function(content){ //returns HTML template string as image title text with link to open the image
                                let log = ""
                                for (let columnIndex in content.columns){
                                    let column = content.columns[columnIndex]
                                    log += (app.fn.nodes.contents[column.type].getLog) ? app.fn.nodes.contents[column.type].getLog(column) : app.fn.nodes.contents[column.type].getNotes(column) //if this content object has a getLog method use that, otherwise default to the getNotes method
                                }
                                return log
                            }
                        },
                        layout_spacer: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'img'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                }
                            },
                            getNotes: function(content){ //returns empty string as notes not required for spacer
                                return ""
                            }
                        },
                        input_textarea: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'input_textarea'
                                seen: function(content){ //returns true if object 'content' has been seen
                                    return content.seen
                                },
                                keywordFoundCount: function(content){ //returns the number of keywords in object 'content' that have been found by the user
                                    var count = 0
                                    for (var keywordIndex in content.keywords) if (content.keywords[keywordIndex].found) count++
                                    return count
                                },
                                keywordIsFound: function(content, keywordId){ //returns true if keyword with id 'keywordId' in object 'content' has been found
                                    for (var keywordIndex in content.keywords){
                                        if (content.keywords[keywordIndex].found && content.keywords[keywordIndex].id == keywordId) return true
                                    }
                                },
                                scorePercentage: function(content){ //returns the percentage score achieved for object 'content'
                                    var score = app.fn.nodes.contents.input_textarea.getScore(content) //fetch the score
                                    return (score.achieved/score.possible)*100 //convert to percentage of possible marks
                                }
                            },
                            entryTooShort: function(entry){ //returns true if string 'entry' is less than minimum length defined in config for input_textarea
                                if (entry.length < app.config.nodes.contents.input_textarea.minLength) return true
                            },
                            getFound: function(content){ //returns array of IDs of keyword objects which have been found by user in object 'content'
                                var found = []
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    var keyword = content.keywords[keywordIndex] //get the current keyword object
                                    if (app.fn.nodes.contents.input_textarea.tests.keywordIsFound(content, keyword)) found.push(keyword.id) //if the current keyword object has been found, add its ID to the array to be returned
                                }
                                return found
                            },  
                            getMissed: function(content){ //returns array of IDs of keyword objects which have NOT been found by user in object 'content'
                                var missed = []
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    var keyword = content.keywords[keywordIndex] //get the current keyword object
                                    if (!app.fn.nodes.contents.input_textarea.tests.keywordIsFound(content, keyword)) missed.push(keyword.id) //if the current keyword object has not been found, add its ID to the array to be returned
                                }
                                return missed
                            },
                            getResponses: function(content){ //returns a string of the responses to keywords which have been found by the user in object 'content'
                                var responses = ""
                                for (var keywordIndex in content.keywords){ //loop through all the keywords in the tested object
                                    if (content.keywords[keywordIndex].found && content.keywords[keywordIndex].response) responses += content.keywords[keywordIndex].response + " " //if the keyword object has been found, add the response to the responses string, plus a space for separation before next
                                }
                                return responses
                            },
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the case notes for this node
                                return "<p>" + app.fn.nodes.contents.input_textarea.getResponses(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.input_textarea.getMissed(content) //gets an array of missed keywords
                                var list = ""
                                for (var index in missed) list += missed[index] + ", " //create a string of missed keywords separated by , and space
                                list = list.slice(0,-2) //remove the trailing comma and space from the string of missed keywords
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You entered: <i>'` + content.userEntry + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.input_textarea.getResponses(content) + `</i><br>
                                    You could also have considered: <i>` + list + `</i><br>
                                    Score: ` + app.fn.nodes.contents.input_textarea.getScore(content).achieved + `/` + app.fn.nodes.contents.input_textarea.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {
                                    possible: 0,
                                    achieved: 0
                                }
                                var defaultScore = app.config.nodes.contents.input_textarea.defaultScore //get the default score from config to use if custom score not defined
                                for (var keywordIndex in content.keywords){ //loop through all the keywords
                                    var keywordScore = (content.keywords[keywordIndex].score) ? content.keywords[keywordIndex].score : defaultScore //define the score to be used for this keyword object, use the default score if a custom score is not defined
                                    if (keywordScore > 0) score.possible += keywordScore //only add positive scores to possible as highest score would avoid all negative scores
                                    if (content.keywords[keywordIndex].found) score.achieved += keywordScore
                                }
                                return score
                            },
                            submit: function(contentIndex){ //called by the @click event of the input_textarea submit button 
                                var node = app.nodes[app.node] // define the current node object
                                var content = node.contents[contentIndex] //define the current content object
                                var entry = content.userEntry // entry = the user's entry within the current textarea content
        
                                if (app.fn.nodes.contents.input_textarea.entryTooShort(entry)) { // only proceed if entry is long enough
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
            
                                    if (!app.fn.nodes.contents.input_textarea.tests.keywordFoundCount(content) > 0 && content.keywords.length > 0) {// only proceed if at least one keyword found
                                        app.fn.alerts.askMore()
                                        return
                                    }
                                    
                                    let responses = app.fn.nodes.contents.input_textarea.getResponses(content)
                                    if (responses) app.fn.alerts.showResponse(responses) //show the textarea responses for those selected
                                }
        
                                app.fn.nodes.updateView() //checks if any content or options on this node should now be shown
                            },
                        },
                        input_checkboxes: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'input_checkboxes'
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
                                    var score = app.fn.nodes.contents.input_checkboxes.getScore(content) //get the score object
                                    return (score.achieved/score.possible)*100 //convert to percentage
                                }
                                
                            },
                            getResponses: function(content){ //returns a string of the responses to checkboxes which have been checked by the user in object 'content'
                                var responses = ""
                                for (var checkboxIndex in content.checkboxes){ //loop through all the checkbox objects in the tested object
                                    if (content.checkboxes[checkboxIndex].checked && content.checkboxes[checkboxIndex].response) responses += content.checkboxes[checkboxIndex].response + " " //if the checkbox object has been checked, add the response to the responses string, plus a space for separation before next
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
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the case notes for this node
                                return "<p>" + app.fn.nodes.contents.input_checkboxes.getResponses(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.input_checkboxes.getMissed(content) //get an array of the IDs of missed checkboxes
                                var list = ""
                                for (var index in missed) list += missed[index] + ", " //create string from array of missed checkboxes, separated by , and space
                                list = list.slice(0,-2) //remove trailing , and space from string of missed checkboxes
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You selected: <i>'` + app.fn.nodes.contents.input_checkboxes.getChecked(content) + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.input_checkboxes.getResponses(content) + `</i><br>
                                    You could also have considered: <i>` + list + `</i><br>
                                    Score: ` + app.fn.nodes.contents.input_checkboxes.getScore(content).achieved + `/` + app.fn.nodes.contents.input_checkboxes.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {
                                    possible: 0,
                                    achieved: 0
                                }
                                var defaultScore = { //get the default scores to be used if custom score not provided
                                    recommended: app.config.nodes.contents.input_checkboxes.defaultScore.recommended,
                                    notRecommended: app.config.nodes.contents.input_checkboxes.defaultScore.notRecommended
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
                            submit: function(contentIndex){ //called by the @click event of the input_checkboxes submit button
                                var node = app.nodes[app.node] //define the current node
                                var content = node.contents[contentIndex] //define the input_checkboxes object
        
                                if (!app.fn.nodes.contents.input_checkboxes.tests.checkedCount(content) > 0) {// only proceed if at least one keyword found
                                    app.fn.alerts.checkMore()
                                    return
                                }
                                
                                let responses = app.fn.nodes.contents.input_checkboxes.getResponses(content)
                                if (responses) app.fn.alerts.showResponse(responses) //show the checkbox responses for those selected
                                
                                app.fn.nodes.updateView()
        
                                content.disabled = true
                            }
                        },
                        input_radios: {
                            tests: { //tests that can form part of a condition for a content or option object where test target is a content object of type 'input_radios'
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
                                    var score = app.fn.nodes.contents.input_radio.getScore(content) //get the score object
                                    return (score.achieved/score.possible)*100 //convert to percentage
                                }
                                
                            },
                            getResponse: function(content){ //returns a string of the response to the radio which is selected by the user in object 'content'
                                for (var radioIndex in content.radios){ //loop through all the radio objects in the tested object
                                    if (content.radios[radioIndex].id == content.selected && content.radios[radioIndex].response) return content.radios[radioIndex].response //if the radio object is selected, return its response
                                }
                                return false
                            },
                            getSetStateValue: function(content){ //returns a string for the 
                                for (var radioIndex in content.radios){ //loop through all the radio objects in the tested object
                                    if (content.radios[radioIndex].id == content.selected) {
                                        return (content.radios[radioIndex].setStateValue) ? content.radios[radioIndex].setStateValue : content.radios[radioIndex].id //if the radio object is selected, return its setStateValue or if not provided, it's id
                                    }
                                }
                                return false
                            },
                            getSelected: function(content){ //returns ID of radio object which is selected by user in object 'content'
                                return content.selected
                            },
                            getMissed: function(content){ //returns ID of recommended radio object which has NOT been selected by user in object 'content'
                                for (var radioIndex in content.radios){ //loop through all the radio objects
                                    if (!app.fn.nodes.contents.input_radios.tests.radioIsSelected(content.radios[radioIndex].id) && content.radios[radioIndex].recommended) return content.radios[radioIndex].title //if the current radio object has not been selected but was recommended, return its title
                                }
                                return false
                            },
                            getNotes: function(content){ //returns HTML template string representing the object 'content' contribution to the case notes for this node
                                return "<p>" + app.fn.nodes.contents.input_radios.getResponse(content) + "</p>"
                            },
                            getLog: function(content){ //returns HTML template string representing the object 'content' contribution to the log for this node
                                var missed = app.fn.nodes.contents.input_radios.getMissed(content) //get an array of the IDs of missed radio
                                return `
                                    <strong>` + content.text + `</strong><br>
                                    You selected: <i>'` + app.fn.nodes.contents.input_radios.getSelected(content) + `'</i><br>
                                    You found out: <i>` + app.fn.nodes.contents.input_radios.getResponse(content) + `</i><br>
                                    You could also have considered: <i>` + missed + `</i><br>
                                    Score: ` + app.fn.nodes.contents.input_radios.getScore(content).achieved + `/` + app.fn.nodes.contents.input_radios.getScore(content).possible
                            },
                            getScore: function(content){ //returns object with possible and achieved scores of the object 'content'
                                var score = {possible: 0, achieved: 0}
                                var defaultScore = { //get the default scores to be used if custom score not provided
                                    recommended: app.config.nodes.contents.input_radios.defaultScore.recommended,
                                    notRecommended: app.config.nodes.contents.input_radios.defaultScore.notRecommended
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
                            submit: function(contentIndex){ //called by the @click event of the input_radios submit button
                                
                                var node = app.nodes[app.node] //define the current node
                                var content = node.contents[contentIndex] //define the input_radios object
                                if (!app.fn.nodes.contents.input_radios.tests.selectedCount(content) > 0) {// only proceed if one selected
                                    app.fn.alerts.checkMore()
                                    return
                                }
        
                                let responses = app.fn.nodes.contents.input_radios.getResponse(content)
                                if (responses) app.fn.alerts.showResponse(responses) //show the radio responses for those selected
                                
                                app.fn.scenario.state.set(content)
                                
                                app.fn.nodes.updateView()
        
                                content.disabled = true
                            }
                        }
                    },
                    options: { //methods relating to option objects
                        findIndex: function(optionId, nodeIndex){ //returns the index of an option with the ID 'optionId' within the current node
                            if (!nodeIndex) nodeIndex = app.node
                            for (var optionIndex in app.nodes[nodeIndex].options) if (app.nodes[nodeIndex].options[optionIndex].id == optionId) return parseInt(optionIndex) //returns the current optionIndex if the id matches 'optionId'
                            console.warn("Unable to find index of optionId", optionId)
                            return false
                        },
                        select: function(optionIndex = 0){ //called by @click event of an option button
                            let node = app.nodes[app.node]
                            if (optionIndex != 99) { //developer 'Skip to next node' button uses optionIndex 99
                                var option = node.options[optionIndex] //define the option object
                                var goTo = (option.goTo) ? app.fn.nodes.findIndex(option.goTo) : app.node + 1 // if a goTo is specified find the index for that node, otherwise provide index for next node
                                console.log("Option '" + option.title + "' selected: goTo '" + app.nodes[goTo].id + "'")
                                for (let optionIndex in node.options) node.options[optionIndex].latestSelection = false //remove any true pre-existing latestSelection properties
                                option.latestSelection = true //set curretn option to be the latestSelection
                                option.selectCount++ //increment the counter for the number of times this option has been selected by the user
                                if (option.onceOnly) option.disabled = true //prevent option being selected further times if it has onceOnly property set true
                            } else { //developer skip to next node
                                goTo = app.node + 1
                                console.log("Skipping to: '" + app.nodes[goTo].id + "'")
                            }
                            app.fn.nodes.events.exit() //call the node exit event
                            app.transitionActive = true
                            setTimeout(function() { // to allow time for node we're leaving to fadeout
                                app.node = goTo //change to the new node
                                app.transitionActive = false
                                app.fn.nodes.events.arrive() //call the node arrive event
                            }, 500)
                        },
                        getLog: function(option){
                            return (option.latestSelection) ? "<strong>" + option.title + "</strong>" : "<span>" + option.title + "</span>"
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
                    notes: {
                        get: function(){ //returns a string with the notes from each content object of the current node
                            let node = app.nodes[app.node] //define the current node
                            let notes = {
                                node: app.node,
                                title: node.title,
                                step: app.scenario.log.length,
                                contents: "",
                                option: ""
                            }
                            if (node.excludeFromNotes) return notes //return blank if entire node is excluded
                            for (var contentIndex in node.contents){ //loop through all the content objects
                                var content = node.contents[contentIndex] //define the current content object
                                if (content.excludeFromNotes) continue
                                app.fn.conditions.check(content) //check the conditions for this content element
                                if (!app.fn.conditions.allMet(content)) continue //skip this content element if it's conditions are not all met
                                notes.contents += app.fn.nodes.contents[content.type].getNotes(content) //call the getNotes method for this content object
                            }
                            for (let optionIndex in node.options){ //loop through all the option objects
                                let option = node.options[optionIndex] //define the current option object
                                if (option.excludeFromNotes) continue //skip this option if it's set to be excluded
                                app.fn.conditions.check(option) //check the conditions for this option
                                if (!option.latestSelection) continue //skip this option if it's not the latest selected
                                notes.option += option.title //use the title of the latestSelection option
                            }
                            return notes
                        }
                    },
                    log: {
                        get: function(){
                            let node = app.nodes[app.node] //define the current node
                            let log = { //create the log object
                                title: node.title,
                                node: app.node,
                                step: app.scenario.log.length,
                                contents: "",
                                options: ""
                            }
                            if (node.excludeFromLog) return false //return blank if entire node is excluded
                            for (var contentIndex in node.contents){ //loop through all the content objects
                                var content = node.contents[contentIndex] //define the current content object
                                if (content.excludeFromLog) continue //skip this content element if it's set to be excluded
                                app.fn.conditions.check(content) //check the conditions for this content element
                                if (!app.fn.conditions.allMet(content)) continue //skip this content element if it's conditions are not all met
                                log.contents += (app.fn.nodes.contents[content.type].getLog) ? app.fn.nodes.contents[content.type].getLog(content) : app.fn.nodes.contents[content.type].getNotes(content) //if this content object has a getLog method use that, otherwise default to the getNotes method
                            }
                            for (let optionIndex in node.options){ //loop through all the option objects
                                let option = node.options[optionIndex] //define the current option object
                                if (option.excludeFromLog) continue //skip this option if it's set to be excluded
                                app.fn.conditions.check(option) //check the conditions for this option
                                if (!app.fn.conditions.allMet(option)) continue //skip this option if it's conditions are not met
                                if (log.options.length) log.options += "&nbsp;|&nbsp;" //add a divider between options - avoiding placing divider before the first item
                                log.options += (app.fn.nodes.options.getLog) ? app.fn.nodes.options.getLog(option) : app.fn.nodes.options.getNotes(option) //if this option object has a getLog method use that, otherwise default to the getNotes method
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
                    },
                    state: {
                        set: function(content){
                            function useSetStateArray(setStateArray){ //iterates over the setState array
                                for (let objIndex in setStateArray) useSetStateObject(setStateArray[objIndex])
                            }
                            function useSetStateObject(setState){ //processes an individual setState object
                                console.log(setState)
                                switch (setState.path.length){ //have to do this longhand as proxy will not allow setting recursively using for in
                                    case 1:
                                        app.scenario.state[setState.path[0]] = setState.value
                                        break
                                    case 2:
                                        app.scenario.state[setState.path[0]][setState.path[1]] = setState.value
                                        break
                                    case 3:
                                        app.scenario.state[setState.path[0]][setState.path[1]][setState.path[2]] = setState.value
                                        break
                                    case 4:
                                        app.scenario.state[setState.path[0]][setState.path[1]][setState.path[2]][setState.path[3]] = setState.value
                                        break
                                    case 5:
                                        app.scenario.state[setState.path[0]][setState.path[1]][setState.path[2]][setState.path[3]][setState.path[4]] = setState.value
                                        break
                                    case 6:
                                        app.scenario.state[setState.path[0]][setState.path[1]][setState.path[2]][setState.path[3]][setState.path[4]][setState.path[5]] = setState.value
                                        break
                                    case 7:
                                        app.scenario.state[setState.path[0]][setState.path[1]][setState.path[2]][setState.path[3]][setState.path[4]][setState.path[5]][setState.path[6]] = setState.value
                                        break
                                    default:
                                        throw "State object too deeply nested."
                                }
                            }
                            if (content.setState) useSetStateArray(content.setState) //if the content element has a setState array process this
                            for (let radioIndex in content.radios) { //if the content element has a radio object which has a setState array process this
                                let radio = content.radios[radioIndex]
                                if (radio.setState && radio.id == content.selected){
                                    useSetStateArray(radio.setState)
                                }
                            }
                        },
                        tests: {
                            value: function(subject){
                                return subject
                            }
                        }                        
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
                                    condition.target.index = app.fn.nodes.contents.findIndex(condition.target.id, condition.target.nodeIndex) //get the index of the target content object from its id
                                    condition.test.subject = app.nodes[condition.target.nodeIndex].contents[condition.target.index] //create property 'subject' and set it to the targetted content object
                                    condition.test.method = app.fn.nodes.contents[condition.test.subject.type].tests[condition.test.methodName] //get the test method from the methodName
                                    break
                                case "options":
                                    condition.target.index = app.fn.nodes.options.findIndex(condition.target.id, condition.target.nodeIndex) //get the index of the target option object from its id
                                    condition.test.subject = app.nodes[condition.target.nodeIndex].options[condition.target.index] //create property 'subject' and set it to the targetted option object
                                    condition.test.method = app.fn.nodes.options.tests[condition.test.methodName] //get the test method from the methodName
                                    break
                                case "state":
                                    condition.test.subject = app.scenario.state
                                    for (let pathIndex in condition.target.id) condition.test.subject = condition.test.subject[condition.target.id[pathIndex]]
                                    condition.test.method = app.fn.scenario.state.tests[condition.test.methodName]
                                    break
                            }
                            app.fn.conditions.runTest(condition)
                        }
                        if (app.fn.conditions.allMet(el)) {
                            app.fn.conditions.show(el)
                        } else {
                            app.fn.conditions.hide(el)
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
                    },
                    hide: function(el){ //sets an element to be not visible
                        el.visible = false
                    }
                }
            }
        }
    },
    methods: {
        testFn: function(msg){ // temporary function
            console.log("testFn", msg)
        },
        toggleFullScreen: function(){ //toggle in/out of full screen mode
            const elem = document.documentElement;
            if (!document.fullscreenElement) {
                elem.requestFullscreen().catch(err => {
                  console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
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
                    if (content.type == 'input_textarea') content.userEntry = "" //create 'userEntry' property for input_textarea content type to allow v-bind to work
                    content.disabled = false //create 'disabled' property for each content object, start as false
                    content.visible = false //create 'visible' property for each content object
                }
            }
            if (node.options){
                for (var optionIndex in node.options){ //loop through all the option objects of the current node object
                    var option = node.options[optionIndex] //define the current option object
                    option.seen = false //create 'seen' property for each option object, start as false
                    option.selectCount = 0 //create 'selectCount' property for each option object, start as 0
                    option.latestSelection = false //create 'latestSelection' property for each option object, start as 0
                    if (!option.class) option.class = {'btn-primary': true} //if property 'class' not defined for each option object, create property and set as 'btn-primary'
                    option.disabled = false //create 'disabled' property for each option object, set as false initially
                    option.visible = false //create 'visible' property for each option object
                }
            }
        }
    },
    mounted() {
        document.getElementById('loader').setAttribute('cloak', true) //makes the loader animation hidden once app loaded
        document.getElementById('app').removeAttribute('cloak') //makes the app visible once loaded
    }
})