let scenario = {
    title: "Example Scenario",
    subtitle: "An example of how to create a scenario object with comments to guide usage",
    config: {
        development: {
            developerPanelVisible: true
        },
        nodes: {
            startNode: 15,
            //object of configuration options relating to nodes
            //required
            contents: {
                //object of configuration options relating to contents of nodes
                //required
                inputTextarea: {
                    //object of configuration options relating to inputTextarea content objects
                    //required
                    minLength: 10,
                        //integer defines minimum length in characters of user entry
                        //required
                    defaultScore: 10
                        //integer defines score for finding keyword if not defined in keyword object
                        //required
                },
                inputCheckbox: {
                    defaultScore: {
                        recommended: 10,
                        //integer defines score for selected recommended checkbox if not defined in checkbox object
                        //required
                        notRecommended: -10
                        //integer defines score for selected not recommended checkbox if not defined in checkbox object
                        //required
                    }
                },
                inputRadio: {
                    defaultScore: {
                        recommended: 10,
                        //integer defines score for selected recommended radio if not defined in radio object
                        //required
                        notRecommended: -10
                        //integer defines score for selected not recommended radio if not defined in radio object
                        //required
                    }
                }
            }
        }
    },
    nodes: [
        {
            id: "welcome",
            title: "Welcome",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-intro",
                    type: "p",
                    text: "Welcome to this example scenario. This is not a clinical scenario but will simply demonstrate the capabilities of this branching scenario application and provide an introduction to what is required to create a scenario."
                },
                {
                    id: "interface-element-list",
                    type: "ul",
                    text: "We'll start by looking at the different elements of the user interface. If you take a look at the interface you'll see several components:",
                    items: [
                        "Page header",
                        "Main content area",
                        "Case notes",
                        "Developer panel"
                    ]
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-page-header",
            title: "The page header",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "The page header includes the scenario title and (optionally) a subtitle. This doesn't change as the user progresses through the scenario."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-main-content-panel",
            title: "Main content panel",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "The main content panel, where you're reading this, has three sections."
                },
                {
                    id: "text-main",
                    type: "p",
                    text: "The panel header shows a title for this part of the scenario - 'Main content area' in this case."
                },
                {
                    id: "text-main",
                    type: "p",
                    text: "The panel body shows one or more content elements, such as text, images or interactive components."
                },
                {
                    id: "text-main",
                    type: "p",
                    text: "The panel footer shows options which the user can choose between. In this case there's only one: 'Next'"
                },
                {
                    id: "text-main",
                    type: "p",
                    text: "Both content elements and option buttons can be set to appear only if certain conditions are met. We'll talk about conditions later."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-case-notes-panel",
            title: "Case notes panel",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "After you move on from a node, useful information is recorded in the case notes panel. This is useful in allowing users to refer back to information they found out earlier in the scenario."
                },
                {
                    id: "text-exclude-from-log",
                    type: "p",
                    text: "You can exclude either entire nodes, or just parts of nodes from the case notes. You might have noticed that the content from the welcome screen isn't showing up in the case notes, that because it was set to be excluded. You can also exclude just parts of a node from the case notes. For example, the next line of text will be excluded."
                },
                {
                    id: "text-exclude-from-log-demo",
                    type: "p",
                    text: "This line of text will not appear in the case notes.",
                    excludeFromLog: true
                },
                {
                    id: "text-img-in-case-notes",
                    type: "p",
                    text: "Certain content will appear differently in the case notes panel compared to the main content area. For example, an image will appear with just descriptive text with a link to open the image itself. There's an example image below."
                },
                {
                    id: "example-img",
                    type: "img",
                    path: "example1.jpg",
                    text: "Example image of a doctor with an infant",
                    caption: {
                        text: "Photo by CDC on Unsplash",
                        link: "https://unsplash.com/@cdc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    }
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-case-notes-part2",
            title: "Case notes panel (part 2)",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "Now that we've moved to a new node, see how some of the previous content has appeared in the case notes panel for future reference. The image appears as a text link which opens the image when clicked. The line of text that was excluded doesn't appear in the case notes."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-developer-panel",
            title: "Developer panel",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "At the bottom of the page is a developer panel that provides some useful information while you're creating a scenario. This panel is only visible during scenario development."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "scenario-object",
            title: "About the scenario object",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "In order to create a scenario you need to define a scenario object. If you've never done any programming before you'll need some help to get started, although this process is quite simple once you know a few rules. Since you're working through a 'scenario' right now, you can take a look at the scenario object that defines it. Try not to be put off by it's complexity at this stage, it'll get much clearer.",
                    excludeFromLog: true
                },
                {
                    id: "link-scenario-object-example",
                    type: "a",
                    text: "Click here to see the scenario object definition",
                    link: "https://github.com/dan-leach/clinical-branching-scenario/blob/main/js/exampleScenario.js"
                },
                {
                    id: "text-json",
                    type: "p",
                    text: "The scenario object is written using javascript object notation, and creates a receipe for the branching logic program to follow to create an interactive experience for the user. Even if you're not going to create the scenario object definition yourself, it helps to be aware of how it works. You need to be aware of a few different types of data that we'll use when creating our scenario object:",
                    excludeFromLog: true
                },
                {
                    id: "text-string",
                    type: "p",
                    heading: {
                        level: 1,
                        text: "String"
                    },
                    text: "A string is a series of characters: letters, numbers or special characters. For example 'abc', 'hello world' or 'My favourite number is 7!'",
                    excludeFromLog: true
                },
                {
                    id: "text-integer-float",
                    type: "p",
                    heading: {
                        level: 1,
                        text: "Integer / Float"
                    },
                    text: "An integer is a whole number which can be positive or negative. For example, -10, 0, 23 are integers. Floats are 'floating' point numbers e.g. 0.01 or -10.4.",
                    excludeFromLog: true
                },
                {
                    id: "text-array",
                    type: "p",
                    heading: {
                        level: 1,
                        text: "Array"
                    },
                    text: "An array is a series of data points. An array is denoted by square brackets and each data point within is separated by a comma. For example you could store a series of words as strings within an array: ['One', 'Two', 'Three']. The data points inside an array can be any time of data such as string, integer, object or another array.",
                    excludeFromLog: true
                },
                {
                    id: "text-object",
                    type: "p",
                    heading: {
                        level: 1,
                        text: "Object"
                    },
                    text: "An object is similar to an array in that it contains other data points but with an object each data point is made up of a key-value pair, also called a property. For example 'age: 10' is a key-value pair where 'age' is the key and 10 is value. An object is denoted by curly brackets and key-value pairs are separated by commas. For example: objectName: { name: 'Joe Bloggs', age: 10}. Objects can contain any data type including other objects.",
                    excludeFromLog: true
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "scenario-object-structure",
            title: "Scenario object structure",
            contents: [
                {
                    id: "ul-top-level-properties",
                    type: "ul",
                    text: "The scenario object has a number of top level properties:",
                    items: [
                        "Title - the title for your scenario - appears at the top of the page",
                        "Subtitle (optional) - appears below the title",
                        "Config - defines certain behaviours and defaults for your scenario",
                        "Nodes - the biggest part of the scenario definition which deterimines what the users see and how they move through the scenario"
                    ]
                },
                {
                    id: "about-nodes",
                    type: "p",
                    heading: {
                        level: 1,
                        text: "About nodes"
                    },
                    text: "The scenario includes an array of 'nodes'. We'll refer to each object in 'nodes' as a 'node'.",
                    excludeFromLog: true
                },
                {
                    id: "about-nodes-2",
                    type: "p",
                    text: "The main content panel shows the current node. Each time the user clicks an option button in the footer of the main content area they move to a new node. Each node contains various properties including 'contents' and 'options'.",
                    excludeFromLog: true
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "node-contents",
            title: "Node contents",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "Each node contains an array of contents. We'll refer to each object in 'contents' as a 'content element'. Each content element within the contents array for the current node will appear in the main content panel body.",
                    excludeFromLog: true
                },
                {
                    id: "ul-content-types",
                    type: "ul",
                    text: "There are various different types of content element you can define:",
                    items: [
                        "text",
                        "link",
                        "heading",
                        "lists",
                        "image",
                        "interactive elements (various types)"
                    ]
                },
                {
                    id: "text-next",
                    type: "p",
                    text: "Now we'll go through each content type in turn so you can see how they work.",
                    excludeFromLog: true
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-text",
            title: "Content type: Text",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-example-1",
                    type: "p",
                    text: "This is an example of a text content element."
                },
                {
                    id: "text-example-2",
                    type: "p",
                    text: "This is another text content element. Each separate element will produce a separate paragraph."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-link",
            title: "Content type: Link",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "Below is an example of a link content element:"
                },
                {
                    id: "link-example",
                    type: "a",
                    text: "Click here to visit example.com",
                    link: "https://example.com"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-heading",
            title: "Content type: heading",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "Below is an example of 3 heading content elements of different levels:"
                },
                {
                    id: "heading-example-1",
                    type: "h",
                    level: 1,
                    text: "Heading level 1"
                },
                {
                    id: "heading-example-2",
                    type: "h",
                    level: 2,
                    text: "Heading level 2"
                },
                {
                    id: "heading-example-3",
                    type: "h",
                    level: 3,
                    text: "Heading level 3"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-lists",
            title: "Content type: lists",
            excludeFromLog: true,
            contents: [
                {
                    id: "ul-example",
                    type: "ul",
                    text: "You can create a list of bulletpoints:",
                    items: ["Item 1", "Item 2", "Item 3"]
                },
                {
                    id: "ol-example",
                    type: "ol",
                    text: "...or a numbered list:",
                    items: ["Item 1", "Item 2", "Item 3"]
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-img",
            title: "Content type: image",
            excludeFromLog: true,
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "You can display images which will appear centered within the main content panel. Optionally you can provide a caption (with or without a link) to describe the image or provide attribution."
                },
                {
                    id: "example-img",
                    type: "img",
                    path: "example1.jpg",
                    text: "Example image of a doctor with an infant",
                    caption: {
                        text: "Photo by CDC on Unsplash",
                        link: "https://unsplash.com/@cdc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    }
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "content-type-interactive",
            title: "Content type: interactive elements",
            contents: [
                {
                    id: "ul-interactive-elements",
                    type: "ul",
                    text: "There are a number of interactive elements which you can use:",
                    items: [
                        "textarea",
                        "checkbox",
                        "radio"
                    ]
                },
                {
                    id: "text-next",
                    type: "p",
                    text: "Now we'll go through each interactive element type in turn so you can see how they work.",
                    excludeFromLog: true
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        {
            id: "interactive-elements-textarea",
            title: "Interactive elements: textarea",
            contents: [
                {
                    id: "text-main",
                    type: "p",
                    text: "Below there is a text input box which the user can type into. You can define keywords (with alternatives) which they might enter."
                },
                {
                    id: "inputTextarea-example",
                    type: "inputTextarea",
                    text: "Try typing in 'hello there' and then clicking 'submit':",
                    keywords: [
                        {
                            id: "hello",
                            title: "hello",
                            triggers: ["hello"],
                            response: "Hello yourself! As well as providing information in response to keywords you can also enable options. We'll discuss conditional content and options later. Click 'ok' below then try adding the word 'next' to your entry and clicking submit again."
                        },
                        {
                            id: "next",
                            title: "next",
                            triggers: ["next"],
                            response: "Nice one. Now you should be able to move on by clicking 'next' below."
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next",
                    conditions: [
                        {
                            target: {
                                id: "inputTextarea-example",
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "next"
                            }
                        }
                    ]
                } 
            ]
        },

        //template blank node
        {
            id: "id",
            title: "title",
            contents: [
                {
                    id: "id",
                    type: "p",
                    text: "text"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                } 
            ]
        },
        //old example
        {
            //object defines the node appearance and behaviour
            //minimum 1 required within nodes array
            id: "welcome",
                //string identifies the node object
                //required for each node object - must be unique within scenario - kebab case
            title: "Welcome to the example scenario",
                //string renders at top of the content area
                //required for each node object
            contents: [
                //array of content objects which will be rendered in order into the content area
                //required for each node object
                { 
                    //object which defines the content appearance and behaviour
                    //minimum 1 required within contents array
                    id: "about-scenario-object",
                        //string identifies the content object
                        //required for each content object- must be unique within node - kebab case
                    type: "p",
                        //string declares the content type
                        //'p' type creates paragraph content shown as plain text with padding
                        //options: 'p', 'img', 'inputTextarea', 'inputCheckbox'
                        //type property for all content objects which require user input begins with 'input'
                        //required for each content object
                    text: "To create a branching scenario the content and logic has to be defined. You can do this be creating a 'scenario' object using javascript object notation (JSON). This example will demonstrate the different ways that you can create content and behaviours."
                        //string renders within <p> tags
                        //required for content type 'p'
                },
                { 
                    id: "top-level-properties-list",
                    type: "ol",
                    text: "The scenario object contains several top level properties:",
                    items: [
                        "title - this renders at the top of the page and is the overall title for your scenario - 'Example Scenario' in this case",
                        "subtitle - this renders just below the title - this property is optional",
                        "config - this object defines several important behaviours for your scenario - we'll cover this later",
                        "nodes - this is where the majority of your work will be"
                    ]
                },
                {
                    id: "click-next",
                    type: "p",
                    text: "Click next to continue",
                    excludeFromLog: true
                }
            ],
            options: [
                //array of option objects will be rendered below the content area
                //required for each node object
                {
                    //object defines option appearance and behaviour
                    id: "next",
                        //identifies the option object
                        //required for each option object - must be unique within options array
                    title: "Next",
                        //string renders as text on button
                        //required for each option object
                }

            ]
        },
        {
            id: "node-example-2",
            title: "example node 2",
            contents: [
                {
                    id: "heading-example-1",
                    type: "h",
                    level: 1,
                    text: "This is a level 1 heading"
                },
                {
                    id: "link-example-1",
                    type: "a",
                    text: "Click here to see how to define a scenario object",
                    link: "guide/"
                },
                {
                    id: "heading-example-2",
                    type: "h",
                    level: 2,
                    text: "This is a level 2 heading"
                },
                {
                    id: "unordered-list-example-1",
                    type: "ul",
                    text: "This is a list of items with bullet points. Alternatively, as below, we can use numbers:",
                    items: ["List item 1", "List item 2", "List item 3"]
                },
                {
                    id: "ordered-list-example-1",
                    type: "ol",
                    items: ["List item 1", "List item 2", "List item 3"]
                },
                {
                    id: "heading-example-3",
                    type: "h",
                    level: 3,
                    text: "This is a level 3 heading"
                },
                {
                    id: "img-example",
                    type: "img",
                        //'img' type creates image content shown centered within content area
                    text: "An example image",
                        //string defines hover text for the image, and the link text when shown in the casenotes
                        //required for content type 'img'
                    path: "example.png",
                        //string defines the path of the image file within directory 'img/'
                        //required for content type 'img'
                    caption: {
                        //object defines properties of a caption to appear centered below the image
                        //optional - if not defined no caption will be shown
                        text: "Example image, used with permission",
                            //string rendered within <figcaption> tags
                            //required if caption object defined
                        link: "https://example.com"
                            //string defines URL to open in new page if caption text is clicked
                            //optional - if not defined then clicking the caption link will produce no effect
                    }
                }
            ]
        },
        {
            id: "example-node-2",
            title: "Example 2",
            contents: [
                {
                    id: "keyword-example",
                    type: "inputTextarea",
                        //'inputTextarea' creates a textarea input with a submit button which will (optionally) test the user entry against defined keywords
                    text: "Please type in 'hello there':",
                        //string renders above the input area, should explain to the user what they should enter
                        //required for content type 'inputTextarea'
                    keywords: [ 
                        //array of keyword objects to test the user input against
                        //optional - if not defined pressing submit will only test the user entry for minimum length
                        {
                            //object defines criteria for keyword object to be 'found' by user
                            //minimum 1 required within keywords array if keywords array defined
                            id: "example-keyword",
                                //string identifies the keyword object
                                //required for each keyword object - must be unique within keywords array - kebab case
                            title: "example keyword",
                                //string renders in feedback to user if not identified e.g. we would have suggested you ask about [keyword.title]
                                //required for each keyword object
                            triggers: [
                                //array of trigger words to test user entry against
                                //required for each keyword object
                                "hello",
                                    //string compared against user entry and if found keyword object is 'found'
                                    //minimum 1 required within triggers array - must be lowercase
                                "example trigger 2",
                                "example trigger 3"
                            ],
                            response: "Some information to show the user if keyword is found",
                                //string renders in alert to user, casenotes and developer log, if the keyword object is found
                                //optional - if not defined no response will be shown to the user for finding this keyword
                            score: 20
                                //integer defines custom score value for finding this keyword object. Can be positive or negative, if negative presumed that matching the keyword is not recommended
                                //optional - if not defined default score will be defined by default score property -> config.nodes.contents.inputTextarea.defaultScore
                        }
                    ]
                },
                {
                    id: "multiple-choice-example",
                    type: "inputCheckbox",
                        //'inputCheckbox' creates a series of checkboxes with a submit button which will (optionally) test the user selection
                    text: "Please select both options:",
                        //string renders above the checkboxes, should explain to the user how to make their selection
                        //required for content type 'inputCheckbox'
                    checkboxes: [
                        //array of checkboxes to display
                        //required for content type 'inputCheckbox'
                        {
                            //object defines checkbox appearance and behaviour
                            //minimum 1 required within checkboxes array
                            id: "option-1",
                                //string identifies the checkbox
                                //required for each checkbox object - must be unique within checkboxes array - kebab case
                            title: "Option 1",
                                //string renders by the checkbox to describe the option to the user
                                //required for each checkbox object
                            response: "You selected option 1",
                                //string renders in alert to user, casenotes and developer log, if the checkbox is selected
                                //required for each checkbox object
                            recommended: true,
                                //boolean defines if this checkbox object is recommended to be selected by the user for feedback and scoring purposes
                                //required for each checkbox object - if not defined will default to not recommended
                            score: 25
                                //integer defines custom score value for selecting this checkbox object. Can be positive or negative
                                //optional - if not defined default score will be defined by default score property -> config.nodes.contents.inputCheckboxes.defaultScoreRecommended / .defaultScoreNotRecommended
                        },
                        {
                            id: "option-2",
                            title: "Option 2",
                            response: "You selected option 2"
                        }
                    ],
                    conditions: [
                        {
                            target: {
                                id: "keyword-example",
                            },
                            test: {
                                methodName: "keywordIsFound",
                                    /*options - for content:
                                            - p
                                                methodName: seen
                                                    no operator or property required
                                                    if condition requires not to be seen set operator -> '=' and require -> false
                                            - h
                                                methodName: seen
                                                    no operator or property required
                                                    if condition requires not to be seen set operator -> '=' and require -> false
                                            - img
                                                methodName: seen
                                                    no operator or property required
                                                    if condition requires not to be seen set operator -> '=' and require -> false
                                            - inputTextarea
                                                methodName: seen
                                                    no operator or property required
                                                    if condition requires not to be seen set operator -> '=' and require -> false
                                                methodName: keywordFoundCount
                                                    set require to an integer, set operator to >, < or =
                                                methodName: keywordIsFound
                                                    do not set operator
                                                    set require to be id of keyword to test
                                                methodName: scorePercentage
                                                    typically set operator -> '>' and require to integer as percentage required
                                            -inputCheckbox
                                                methodName: seen
                                                    no operator or property required
                                                    if condition requires not to be seen set operator -> '=' and require -> false
                                                methodName: checkedCount
                                                    set require to an integer, set operator to >, < or =
                                                methodName: checkboxIsChecked
                                                    do not set operator
                                                    set require to be id of keyword to test
                                                methodName: scorePercentage
                                                    typically set operator -> '>' and require to integer as percentage required
                                    */
                                require: "example-keyword"
                            }
                        }
                    ]
                },
                {
                    id: "single-choice-example",
                    type: "inputRadio",
                        //'inputRadio' creates a series of radio buttons with a submit button which will (optionally) test the user selection
                    text: "Please select option 2:",
                        //string renders above the radio buttons, should explain to the user how to make their selection
                        //required for content type 'inputRadio'
                    radios: [
                        //array of radio buttons to display
                        //required for content type 'inputRadio'
                        {
                            //object defines radio button appearance and behaviour
                            //minimum 1 required within radios array
                            id: "option-1",
                                //string identifies the radio button
                                //required for each radio object - must be unique within radios array - kebab case
                            title: "Option 1",
                                //string renders by the radio to describe the option to the user
                                //required for each radio object
                            response: "You selected option 1",
                                //string renders in alert to user, casenotes and developer log, if the radio is selected
                                //required for each radio object
                            recommended: false,
                                //boolean defines if this radio object is recommended to be selected by the user for feedback and scoring purposes
                                //required for each radio object - if not defined will default to not recommended
                            score: -10
                                //integer defines custom score value for selecting this radio object. Can be positive or negative
                                //optional - if not defined default score will be defined by default score property -> config.nodes.contents.inputRadio.defaultScoreRecommended / .defaultScoreNotRecommended
                        },
                        {
                            id: "option-2",
                            title: "Option 2",
                            response: "You selected option 2",
                            recommended: true,
                            score: 10
                        }
                    ],
                    conditions: [
                        {
                            target: {
                                id: "multiple-choice-example",
                            },
                            test: {
                                methodName: "checkedCount",
                                operator: "=",
                                require: 2
                            }
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next",
                    conditions: [
                        //array of conditions which must all evaluate to true before this option is displayed
                        //optional - if not defined option will be visible by default
                        {
                            //object defines a condition which must evaluate to true before object is shown
                            //minimum 1 required within conditions array if conditions array is defined
                            target: {
                                //object defines object to become subject of test
                                //required for each condition object
                                id: "example-node-1",
                                    //string id of object to test
                                    //required
                                in: "nodes",
                                    //string defines what array to search for the object within
                                    //options 'nodes', 'contents', 'options'
                                    //optional - if not defined defaults to contents
                                nodeName: ""
                                    //string defines name of node object which contains the target object
                                    //optional - if not defined defaults to current node. Ignored if type = 'node'
                            },
                            test: {
                                //object defines test to perform on target
                                //required for each condition object
                                methodName: "visitCount",
                                    //string defines a function to perform on the defined content which will return a value to compare against the requirement
                                    /*options - for nodes:
                                            methodName: visitCount
                                                set require to an integer, set operator to >, < or =
                                    */
                                    //required for each test object
                                operator: ">",
                                    //string defines operator for comparison of test requirement against returned value of test name
                                    //optional - if not defined test will pass if defined test name returns 'true'
                                require: 0
                                    //integer defines value to compare against returned value of defined test using defined operator
                                    //optional unless method requires it or if test operator defined
                            }
                        },
                        {
                            target: {
                                id: "single-choice-example",
                            },
                            test: {
                                methodName: "radioIsSelected",
                                require: "option-2"
                            }
                        },
                        {
                            target: {
                                id: "next",
                                in: "options",
                                nodeName: "example-node-1"
                            },
                            test: {
                                methodName: "selectCount",
                                    /*options:
                                        - for options
                                            methodName: seen
                                                no operator or property required
                                                if condition requires not to be seen set operator -> '=' and require -> false
                                            methodName: selectCount
                                                set require to an integer, set operator to >, < or =
                                            methodName: isDisabled
                                                no operator or property required
                                                if condition requires not to be disabled, set operator -> '=' and require -> false
                                            methodName: isVisible
                                                no operator or property required
                                                if condition requires not to be visible set operator -> '=' and require -> false
                                    */
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                }

            ]
        },
        {
            id: "example-node-3",
            title: "Example 3"
        }
    ]
}