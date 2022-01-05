//example of scenario definition with comments to guide usage
var scenarioExample = {
    //object with config and nodes objects
    //required
    config: {
        //object of configuration options which define the scenario behaviour
        //required
        nodes: {
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
                inputCheckboxes: {
                    defaultScoreRecommended: 10,
                        //integer defines score for selected recommended checkbox is not defined in checkbox object
                        //required
                    defaultScoreNotRecommended: -10
                        //integer defines score for selected not recommended checkbox is not defined in checkbox object
                        //required
                }
            }
        }
    },
    nodes: [
        //array of node objects which can be navigated through to create the scenario logic
        //required
        {
            //object defines the node appearance and behaviour
            //minimum 1 required within nodes array
            name: "example-name",
                //string used for identifing the node
                //required for each node object - must be unique within scenario - kebab case
            heading: "Example",
                //string renders at top of the content area
                //required for each node object
            contents: [
                //array of content objects which will be rendered in order into the content area
                //required for each node object
                { 
                    //object which defines the content appearance and behaviour
                    //minimum 1 required within contents array
                    name: "text-example-1",
                        //string used for identifing the content object
                        //required for each content object- must be unique within node - kebab case
                    type: "p",
                        //string declares the content type
                        //'p' type creates paragraph content shown as plain text with padding
                        //options: 'p', 'img', 'inputTextarea', 'inputCheckbox'
                        //type property for all content objects which require user input begins with 'input'
                        //required for each content object
                    text: "This content will be show to the user as a paragraph.",
                        //string renders within <p> tags
                        //required for content type 'p'
                    excludeFromLog: true
                        //boolean
                        //optional - set true content will not be shown in the casenotes panel or recorded in the developer log
                },
                {
                    name: "img-example",
                    type: "img",
                        //'img' type creates image content shown centered within content area
                    src: "example.jpg",
                        //string defines the filename or path of the image file within directory 'img/' from root folder of the app
                        //required for content type 'img'
                    alt: "An example image",
                        //string defines hover text for the image, and the link text when shown in the casenotes
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
                },
                {
                    name: "keyword-example",
                    type: "inputTextarea",
                        //'inputTextarea' creates a textarea input with a submit button which will (optionally) test the user entry against defined keywords
                    label: "Please enter some text:",
                        //string renders above the input area, should explain to the user what they should enter
                        //required for content type 'inputTextarea'
                    keywords: [ 
                        //array of keyword objects to test the user input against
                        //optional - if not defined pressing submit will only test the user entry for minimum length
                        {
                            //object defines criteria for keyword object to be 'found' by user
                            //minimum 1 required within keywords array if keywords array defined
                            name: "example keyword",
                            //string renders in feedback to user if not identified
                            //required for each keyword object - must be unique with array - must be lowercase
                            triggers: [
                                //array of trigger words to test user entry against
                                //required for each keyword object
                                "example trigger 1",
                                    //string compared against user entry and if found keyword object is 'found'
                                    //minimum 1 required within triggers array - must be lowercase
                                "example trigger 2",
                                "example trigger 3"
                            ],
                            response: "Some information to show the user if keyword is found",
                                //string renders in alert to user, casenotes and developer log, if the keyword object is found
                                //required for each keyword object
                            score: 20
                                //integer defines custom score value for finding this keyword object. Can be positive or negative, if negative presumed that matching the keyword is not recommended
                                //optional - if not defined default score will be defined by default score property -> config.nodes.contents.inputTextarea.defaultScore
                        }
                    ]
                },
                {
                    name: "multiple-choice-example",
                    type: "inputCheckbox",
                        //'inputCheckbox' creates a series of checkboxes with a submit button which will (optionally) test the user selection
                    label: "Please select from these options:",
                        //string renders above the checkboxes, should explain to the user how to make their selection
                        //required for content type 'inputCheckbox'
                    checkboxes: [
                        //array of checkboxes to display
                        //required for content type 'inputCheckbox'
                        {
                            //object defines checkbox appearance and behaviour
                            //minimum 1 required within checkboxes array
                            label: "Option 1",
                                //string renders by the checkbox to identify the option to the user
                                //required for each checkbox object
                            response: "You selected option 1",
                                //string renders in alert to user, casenotes and developer log, if the checkbox is selected
                                //required for each checkbox object
                            recommended: true,
                                //boolean defines if this checkbox object is recommended to be selected by the user for feedback and scoring purposes
                                //required for each checbox object - if not defined will default to not recommended
                            score: 25
                                //integer defines custom score value for selecting this checkbox object. Can be positive or negative
                                //optional - if not defined default score will be defined by default score property -> config.nodes.contents.inputCheckboxes.defaultScoreRecommended / .defaultScoreNotRecommended
                        }
                    ]
                }
            ],
            options: [
                //array of option objects will be rendered below the content area
                //required for each node object
                {
                    //object defines option appearance and behaviour
                    title: "My option",
                        //string renders as text on button
                        //required for each option object
                    goTo: "example-name-2",
                        //string defines name of node to move to if this option is clicked
                        //optional - if not defined will default to next node in array
                    conditions: [
                        //array of conditions which must all evaluate to true before this option is displayed
                        //optional - if not defined option will be visible by default
                        {
                            //object defines a condition which must evaluate to true before object is shown
                            //minimum 1 required within conditions array if conditions array is defined
                            contentName: "keyword-example",
                                //string defines name of content object to test
                                //required for each condition object
                            test: {
                                //object defines test to perform on content
                                //required for each condition object
                                name: "checkedCount",
                                    //string defines a function to perform on the defined content which will return a value to compare against the requirement
                                    //required for each test object
                                operator: ">",
                                    //string defines operator for comparison of test requirement against returned value of test name
                                    //optional - if not defined test will pass if defined test name returns 'true'
                                requirement: 0
                                    //integer defines value to compare against returned value of defined test using defined operator
                                    //required if test operator defined
                            }
                        }
                    ],
                    onceOnly: true
                        //boolean defines if the option can only be selected once, for example if node may be visited by a user multiple times
                        //optional - if not defined then defaults to false
                }

            ]
        }
    ]
}

var scenario = {
    config: {
        nodes: {
            contents: {
                inputTextarea: {
                    minLength: 10,
                    defaultScore: 10
                },
                inputCheckboxes: {
                    defaultScoreRecommended: 10,
                    defaultScoreNotRecommended: -10
                }
            }
        }
    },
    nodes: [
        { //0 - welcome
            name: "welcome",
            heading: "Welcome",
            contents: [
                {
                    type: "text",
                    text: "This clinical scenario will develop depending on the decisions you make. You will be presented with information which may or may not be relevant. Sometimes you may only be shown important or useful infomation if you specifically ask for it. Try to consider what you would do in your clinical practice during this scenario.",
                    excludeFromLog: true
                }
            ],
            options: [
                {
                    title: "Next"
                }
            ]
        },
        { //1 - case background
            name: "case-background",
            heading: "Case background",
            contents: [
                {
                    type: "text",
                    text: "You are asked to review a 37+3 week gestation male infant on the postnatal ward. He has a birth weight of 3.0kg. He is now 12 hours of age and has a macular rash."
                },
                {
                    type: "img",
                    src: "rash.jpg",
                    alt: "Photograph of a infant with a rash",
                    caption: {
                        text: "© Professor Raimo Suhonen/DermNet with permission.",
                        link: "https://dermnetnz.org/imagedetail/17197?copyright=&label=#"
                    }
                }
            ],
            options: [
                {
                    title: "Next"
                }
            ]
        },
        { //2 - history taking
            name: "history-taking",
            heading: "History taking",
            contents: [
                {
                    type: 'inputTextarea',
                    name: "history-textarea",
                    label: "What would you like to ask about in the history?",
                    keywords: [
                        {
                            name: "pregnancy",
                            triggers: ["antenatal", "pregnancy"],
                            response: "This pregnancy was uneventful except for a mild flu-like illness at 34 weeks."
                        },
                        {
                            name: "antenatal scans",
                            triggers: ["scan", "scans", "ultrasound", "USS"],
                            response: "The antenatal scans were unremarkable.",
                            score: 100
                        },
                        {
                            name: "maternal medication",
                            triggers: ["medication", "drugs", "DHx", "maternal medical", "maternal PMHx"],
                            response: "No maternal medication or signficiant past medical history."
                        },
                        {
                            name: "birth history",
                            triggers: ["delivery", "birth"],
                            response: "Spontaneous onset of labour. SVD at 37 weeks.",
                            score: -50
                        },
                        {
                            name: "risk factors for infection",
                            triggers: ["risk factors", "red flags"],
                            response: "There were no risk factors for sepsis."
                        },
                        {
                            name: "feeding",
                            triggers: ["feeding", "feed", "milk", "breastfeeding", "expressing", "BF", "EBM"],
                            response: "The baby has not really shown any interest in feeding so far. He has been given a couple of syringes of EBM."
                        }
                    ]
                }
            ],
            options: [
                {
                    title: "Next",
                    conditions: [
                        {
                            nodeName: "history-taking", //or don't specify nodeName to assume current
                            contentName: "history-textarea",
                            test: {
                                name: "foundCount",
                                operator: ">",
                                requirement: 0
                            }                        
                        }
                    ]
                }
            ]
        },
        { //3 - examination
            name: "examination",
            heading: "Examination",
            contents: [
                {
                    type: "inputTextarea",
                    name: "examination-textarea",
                    label: "What would you like to look for when examining this baby?",
                    keywords: [
                        {
                            triggers: ["airway", "stridor", "grunting", "respiratory", "work of breathing", "WOB", "recession", "tachypnoea", "respiratory rate", "RR", "apnoea", "cyanosis", "cyanosed", "blue", "colour", "oxygen", "hypoxia"],
                            response: "[Response to airway/breathing keyword]. "
                        },
                        {
                            triggers: ["tachycardia", "heart rate", "HR", "bradycardia", "cap refil", "capillary refil", "CRT", "perfusion", "perfusion", "cool", "cold", "hypothermia", "temperature", "hypotensive", "hypotension"],
                            response: "[Response to cardiovascular keyword]. "
                        },
                        {
                            triggers: ["floppy", "unresponsive", "tone", "handling", "behaviour", "responsiveness", "encephalopathy", "quiet", "wake", "waking", "irritable", "cry", "crying", "seizure", "fontanelle", "temperature", "fever", "febrile"],
                            response: "[Response to disability keyword] "
                        }
                    ],
                    userEntry: "",
                    keywordResponses: ""
                }
            ],
            options: [
                {
                    title: "Next",
                    conditions: [
                        {
                            contentName: "examination-textarea",
                            test: {
                                name: "foundCount",
                                operator: ">",
                                requirement: 0
                            }                        
                        }
                    ]
                }
            ]
        },
        { //4 - investigations
            name: "investigations",
            heading: "Investigations",
            contents: [
                {
                    type: "inputCheckbox",
                    name: "investigations-checkbox",
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
                            recommended: false,
                            score: -10
                        }
                    ]
                }
            ],
            options: [
                {
                    title: "Next",
                    conditions: [
                        {
                            contentName: "investigations-checkbox",
                            test: {
                                name: "checkedCount",
                                operator: ">",
                                requirement: 0
                            }                        
                        }
                    ]
                }
            ]
        },
        { //5 - management
            name: "management",
            heading: "Management",
            contents: [
                {
                    type: "inputTextarea",
                    name: "management-textarea",
                    label: "What would you like to do next?",
                    keywords: [
                        {
                            name: "glucose",
                            triggers: ["glucose", "hypostop"]
                        },
                        {
                            name: "feed",
                            triggers: ["feed", "milk", "formula"],
                        },
                        {
                            name: "antibiotics",
                            triggers: ["antibiotic", "abx", "antimicrobial"],
                        }
                    ],
                    userEntry: ""
                }
            ],
            options: [
                {
                    title: "Option 1",
                    goTo: "option-1",
                    conditions: [
                        {
                            contentName: "management-textarea",
                            test: {
                                name: "isFound",
                                requirement: "glucose"
                            }
                        }
                    ],
                    onceOnly: true
                },
                {
                    title: "Option 2",
                    goTo: "option-2",
                    conditions: [
                        {
                            contentName: "management-textarea",
                            test: {
                                name: "isFound",
                                requirement: "feed"
                            }
                        }
                    ],
                },
                {
                    title: "Option 3",
                    goTo: "option-3",
                    conditions: [
                        {
                            contentName: "management-textarea",
                            test: {
                                name: "isFound",
                                requirement: "antibiotics"
                            }
                        }
                    ],
                }
            ]
        },
        { //6 - option 1
            name: "option-1",
            heading: "Options 1",
            contents: [
                {
                    type: "text",
                    text: "Option 1 selected"
                }
            ],
            options: [
                {
                    title: "Make a new management plan",
                    goTo: "management"
                },
                {
                    title: "Go to option 2 instead",
                    goTo: "option-2"
                },
                {
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //7 - option 2
            name: "option-2",
            heading: "Option 2",
            contents: [
                {
                    type: "text",
                    text: "Option 2 selected"
                }
            ],
            options: [
                {
                    title: "Go to option 3 instead",
                    goTo: "option-3"
                },
                {
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //8 - option 3
            name: "option-3",
            heading: "Option 3",
            contents: [
                {
                    type: "text",
                    text: "Option 3 selected"
                }
            ],
            options: [
                {
                    title: "Go to option 1 instead",
                    goTo: "option-1"
                },
                {
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //x - end
            name: "end",
            heading: "End",
            contents: [
                {
                    type: "text",
                    text: "End of scenario"
                }
            ]
        }
    ]
}