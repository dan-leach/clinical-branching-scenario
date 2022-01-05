var scenario = {
    title: "Neonatal Sepsis",
    subtitle: "A responsive branching clinical scenario dealing with decision making on the topic of early-onset sepsis.",
    config: {
        nodes: {
            contents: {
                inputTextarea: {
                    minLength: 10,
                    defaultScore: 10
                },
                inputCheckbox: {
                    defaultScore: {
                        recommended: 10,
                        notRecommended: -10
                    }
                }
            }
        }
    },
    nodes: [
        { //0 - welcome
            id: "welcome",
            title: "Welcome",
            contents: [
                {
                    id: "introduction",
                    type: "p",
                    text: "This clinical scenario will develop depending on the decisions you make. You will be presented with information which may or may not be relevant. Sometimes you may only be shown important or useful infomation if you specifically ask for it. Try to consider what you would do in your clinical practice during this scenario.",
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
        { //1 - case background
            id: "case-background",
            title: "Case background",
            contents: [
                {
                    id: "background",
                    type: "p",
                    text: "You are asked to review a 37+3 week gestation male infant on the postnatal ward. He has a birth weight of 3.0kg. He is now 12 hours of age and has a macular rash."
                },
                {
                    id: "rash",
                    type: "img",
                    title: "Photograph of a infant with a rash",
                    path: "rash.jpg",
                    caption: {
                        text: "© Professor Raimo Suhonen/DermNet with permission.",
                        link: "https://dermnetnz.org/imagedetail/17197?copyright=&label=#"
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
        { //2 - history taking
            id: "history-taking",
            title: "History taking",
            contents: [
                {
                    id: "history-textarea",
                    type: 'inputTextarea',
                    text: "What would you like to ask about in the history?",
                    keywords: [
                        {
                            id: "pregnancy",
                            title: "pregnancy",
                            triggers: ["antenatal", "pregnancy"],
                            response: "This pregnancy was uneventful except for a mild flu-like illness at 34 weeks."
                        },
                        {
                            id: "antenatal-scans",
                            title: "antenatal scans",
                            triggers: ["scan", "scans", "ultrasound", "USS"],
                            response: "The antenatal scans were unremarkable.",
                            score: 100
                        },
                        {
                            id: "maternal-medication",
                            title: "maternal medication",
                            triggers: ["medication", "drugs", "DHx", "maternal medical", "maternal PMHx"],
                            response: "No maternal medication or signficiant past medical history."
                        },
                        {
                            id: "birth-history",
                            title: "birth history",
                            triggers: ["delivery", "birth"],
                            response: "Spontaneous onset of labour. SVD at 37 weeks.",
                            score: -50
                        },
                        {
                            id: "risk factors",
                            title: "risk factors for infection",
                            triggers: ["risk factors", "red flags"],
                            response: "There were no risk factors for sepsis."
                        },
                        {
                            id: "feeding",
                            title: "feeding",
                            triggers: ["feeding", "feed", "milk", "breastfeeding", "expressing", "BF", "EBM"],
                            response: "The baby has not really shown any interest in feeding so far. He has been given a couple of syringes of EBM."
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
                                id: "history-textarea"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: ">",
                                require: 0
                            }                        
                        }
                    ]
                }
            ]
        },
        { //3 - examination
            id: "examination",
            title: "Examination",
            contents: [
                {
                    id: "examination-textarea",
                    type: "inputTextarea",
                    text: "What would you like to look for when examining this baby?",
                    keywords: [
                        {
                            id: "airway",
                            title: "airway assessment",
                            triggers: ["airway", "stridor", "grunting", "respiratory", "work of breathing", "WOB", "recession", "tachypnoea", "respiratory rate", "RR", "apnoea", "cyanosis", "cyanosed", "blue", "colour", "oxygen", "hypoxia"],
                            response: "[Response to airway/breathing keyword]. "
                        },
                        {
                            id: "cvs",
                            title: "cardiovascular assessment",
                            triggers: ["tachycardia", "heart rate", "HR", "bradycardia", "cap refil", "capillary refil", "CRT", "perfusion", "perfusion", "cool", "cold", "hypothermia", "temperature", "hypotensive", "hypotension"],
                            response: "[Response to cardiovascular keyword]. "
                        },
                        {
                            id: "neuro",
                            title: "neurological assessment",
                            triggers: ["floppy", "unresponsive", "tone", "handling", "behaviour", "responsiveness", "encephalopathy", "quiet", "wake", "waking", "irritable", "cry", "crying", "seizure", "fontanelle", "temperature", "fever", "febrile"],
                            response: "[Response to disability keyword] "
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
                                id: "examination-textarea"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                }
            ]
        },
        { //4 - investigations
            id: "investigations",
            title: "Investigations",
            contents: [
                {
                    id: "investigations-checkbox",
                    type: "inputCheckbox",
                    text: "Select any inital investigations you would like to perform:",
                    checkboxes: [
                        {
                            id: "obs",
                            title: "Set of observations",
                            response: "[Observations]. ",
                            recommended: true
                        },
                        {
                            id: "glucose",
                            title: "Blood glucose",
                            response: "[Blood glucose]. ",
                            recommended: true
                        },
                        {
                            id: "gas",
                            title: "Blood gas",
                            response: "[Blood gas]. ",
                            recommended: true
                        },
                        {
                            id: "cxr",
                            title: "CXR",
                            response: "[CXR]. ",
                            recommended: false,
                            score: -10
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
                                id: "investigations-checkbox"
                            },
                            test: {
                                methodName: "checkedCount",
                                operator: ">",
                                require: 0
                            }                        
                        }
                    ]
                }
            ]
        },
        { //5 - management
            id: "management",
            title: "Management",
            contents: [
                {
                    id: "management-textarea",
                    type: "inputTextarea",
                    text: "What would you like to do next?",
                    keywords: [
                        {
                            id: "glucose",
                            title: "glucose",
                            triggers: ["glucose", "hypostop"]
                        },
                        {
                            id: "feed",
                            title: "feed",
                            triggers: ["feed", "milk", "formula"],
                        },
                        {
                            id: "antibiotics",
                            title: "antibiotics",
                            triggers: ["antibiotic", "abx", "antimicrobial"],
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "option-1",
                    title: "Option 1",
                    goTo: "option-1",
                    conditions: [
                        {
                            target: {
                                id: "management-textarea"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "glucose"
                            }
                        }
                    ],
                    onceOnly: true
                },
                {
                    id: "option-2",
                    title: "Option 2",
                    goTo: "option-2",
                    conditions: [
                        {
                            target: {
                                id: "management-textarea"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "feed"
                            }
                        }
                    ],
                },
                {
                    id: "option-3",
                    title: "Option 3",
                    goTo: "option-3",
                    conditions: [
                        {
                            target: {
                                id: "management-textarea"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "antibiotics"
                            }
                        }
                    ],
                }
            ]
        },
        { //6 - option 1
            id: "option-1",
            title: "Options 1",
            contents: [
                {
                    id: "option-1-text",
                    type: "p",
                    text: "Option 1 selected"
                }
            ],
            options: [
                {
                    id: "management",
                    title: "Make a new management plan",
                    goTo: "management"
                },
                {
                    id: "option-2",
                    title: "Go to option 2 instead",
                    goTo: "option-2"
                },
                {
                    id: "end",
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //7 - option 2
            id: "option-2",
            title: "Option 2",
            contents: [
                {
                    id: "option-2-text",
                    type: "p",
                    text: "Option 2 selected"
                }
            ],
            options: [
                {
                    id: "option-3",
                    title: "Go to option 3 instead",
                    goTo: "option-3"
                },
                {
                    id: "end",
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //8 - option 3
            id: "option-3",
            title: "Option 3",
            contents: [
                {
                    id: "option-3-text",
                    type: "p",
                    text: "Option 3 selected"
                }
            ],
            options: [
                {
                    id: "option-1",
                    title: "Go to option 1 instead",
                    goTo: "option-1"
                },
                {
                    id: "end",
                    title: "End scenario",
                    goTo: "end"
                }
            ]
        },
        { //x - end
            id: "end",
            title: "End",
            contents: [
                {
                    id: "end-text",
                    type: "p",
                    text: "End of scenario"
                }
            ]
        }
    ]
}