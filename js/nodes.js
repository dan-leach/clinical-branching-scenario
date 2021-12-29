var nodes = [
    { //0 - welcome
        name: "welcome",
        heading: "Welcome",
        contents: [
            {
                type: "text",
                text: "This clinical scenario will develop depending on the decisions you make. You will be presented with information which may or may not be relevant. Sometimes you may only be shown important or useful infomation if you specifically ask for it. Try to consider what you would do in your clinical practice during this scenario.",
                excludeFromNotes: true
            }
        ],
        options: [
            {
                title: "Next",
                visible: true,
                class: {'btn-primary': true}
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
                title: "Next",
                visible: true,
                class: {'btn-primary': true}
            }
        ]
    },
    { //2 - history taking
        name: "history-taking",
        heading: "History taking",
        contents: [
            {
                type: 'input',
                name: "history-textarea",
                inputType: 'textarea',
                label: "What would you like to ask about in the history",
                keywords: [
                    {
                        triggers: ["antenatal", "pregnancy"],
                        response: "This pregnancy was uneventful except for a mild flu-like illness at 34 weeks. "
                    },
                    {
                        triggers: ["scan", "scans", "ultrasound", "USS"],
                        response: "The antenatal scans were unremarkable. ",
                        score: 100
                    },
                    {
                        triggers: ["medication", "drugs", "DHx", "maternal medical", "maternal PMHx"],
                        response: "No maternal medication or signficiant past medical history. "
                    },
                    {
                        triggers: ["delivery", "birth"],
                        response: "Spontaneous onset of labour. SVD at 37 weeks. ",
                        score: -50
                    },
                    {
                        triggers: ["risk factors", "red flags"],
                        response: "There were no risk factors for sepsis. "
                    },
                    {
                        triggers: ["feeding", "feed", "milk", "breastfeeding", "expressing", "BF", "EBM"],
                        response: "The baby has not really shown any interest in feeding so far. He has been given a couple of syringes of EBM."
                    }
                ],
                userEntry: ""
            }
        ],
        options: [
            {
                title: "Next",
                class: {'btn-primary': true},
                visible: false,
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
                type: "input",
                name: "examination-textarea",
                inputType: "textarea",
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
                class: {'btn-primary': true},
                visible: false,
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
                type: "input",
                name: "investigations-checkbox",
                inputType: "checkbox",
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
                class: {'btn-primary': true},
                visible: false,
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
                type: "input",
                name: "management-textarea",
                inputType: "textarea",
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
                userEntry: "",
                keywordResponses: ""
            }
        ],
        options: [
            {
                title: "Option 1",
                goTo: "option-1",
                class: {'btn-primary': true},
                visible: false,
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
                class: {'btn-primary': true},
                visible: false,
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
                class: {'btn-primary': true},
                visible: false,
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
                goTo: "management",
                class: {'btn-primary': true},
                visible: true
            },
            {
                title: "Go to option 2 instead",
                goTo: "option-2",
                class: {'btn-primary': true},
                visible: true
            },
            {
                title: "End scenario",
                goTo: "end",
                class: {'btn-primary': true},
                visible: true
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
                goTo: "option-3",
                class: {'btn-primary': true},
                visible: true
            },
            {
                title: "End scenario",
                goTo: "end",
                class: {'btn-primary': true},
                visible: true
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
                goTo: "option-1",
                class: {'btn-primary': true},
                visible: true            },
            {
                title: "End scenario",
                goTo: "end",
                class: {'btn-primary': true},
                visible: true
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