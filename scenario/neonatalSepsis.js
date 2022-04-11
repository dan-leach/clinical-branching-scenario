var scenario = {
    title: "Neonatal Sepsis",
    subtitle: "A responsive branching clinical scenario dealing with decision making on the topic of early-onset sepsis.",
    config: {
        development: {
            developerPanelVisible: true,
            startNode: 4
        },
        nodes: {
            contents: {
                input_textarea: {
                    minLength: 10,
                    defaultScore: 10
                },
                input_checkbox: {
                    defaultScore: {
                        recommended: 10,
                        notRecommended: -10
                    }
                },
                input_radios: {
                    defaultScore: {
                        recommended: 10,
                        notRecommended: -10
                    }
                }
            }
        }
    },
    state: {
        user: {
            grade: ""
        },
        environment: {
            guideline: ""
        },
        patient: {
            
        }
    },
    nodes: [
        {
            id: "welcome",
            title: "Welcome",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
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
        {
            id: "scenario-options",
            title: "Scenario options",
            contents: [
                {
                    id: "input_radios-1",
                    type: "input_radios",
                    excludeFromNotes: true,
                    text: "Please select your grade (you can choose to select a grade above or below that in which you currently work):",
                    radios: [
                        {
                            id: "sho",
                            title: "FY1-2 / ST1-3 / Junior Clinical Fellow",
                            setState: [
                                {
                                    path: ['user','grade'],
                                    value: "sho"
                                }
                            ],
                        },
                        {
                            id: "reg",
                            title: "ST4-8 / Senior Clinical Fellow",
                            setState: [
                                {
                                    path: ['user','grade'],
                                    value: "reg"
                                }
                            ],
                        },
                        {
                            id: "cons",
                            title: "Consultant / Senior Staff Grade",
                            setState: [
                                {
                                    path: ['user','grade'],
                                    value: "cons"
                                }
                            ],
                        }
                    ]
                },
                {
                    id: "input_radios-2",
                    type: "input_radios",
                    excludeFromNotes: true,
                    text: "Please select which guideline your current trust uses for the recognition of neonatal sepsis:",
                    radios: [
                        {
                            id: "NICE",
                            title: "NICE guideline [NG195]: Neonatal Infection",
                            setState: [
                                {
                                    path: ['environment','guideline'],
                                    value: "NICE"
                                }
                            ],
                        },
                        {
                            id: "kaizer",
                            title: "Kaizer Permanente Infection Probability Calculator",
                            setState: [
                                {
                                    path: ['environemnt','guideline'],
                                    value: "kaizer"
                                }
                            ],
                        }
                    ],
                    conditions: [
                        {
                            target: {
                                id: "input_radios-1"
                            },
                            test: {
                                methodName: "selectedCount",
                                operator: ">",
                                require: 0
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
                        {
                            target: {
                                id: "input_radios-1"
                            },
                            test: {
                                methodName: "selectedCount",
                                operator: ">",
                                require: 0
                            }
                        },
                        {
                            target: {
                                id: "input_radios-2"
                            },
                            test: {
                                methodName: "selectedCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "call-from-midwife",
            title: "Call from midwife",
            contents: [
                {
                    id: "text_bullets-1",
                    type: "text_bullets",
                    text: "You receive a call from a midwife on the postnatal ward who gives you the following SBAR summary:",
                    items: [
                        "Situation: There is an infant on the postnatal ward with a rash.",
                        "Background: 37+3 week gestation male infant, born 12 hours ago.",
                        "Assessment: The previous set of observations were normal.",
                        "Recommendation: Please would you come and review the rash."
                    ]
                },
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "You have just finished seeing another patient so you decide to take a look now.",
                    excludeFromNotes: true
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
            id: "history-taking",
            title: "History taking",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "You start by talking to the mother. What would you like to ask about in the history?",
                    excludeFromNotes: true
                },
                {
                    id: "input_textarea-1",
                    type: 'input_textarea',
                    text: "Type in questions you'd like to ask then click submit.",
                    keywords: [
                        {
                            id: "pregnancy",
                            title: "pregnancy",
                            triggers: ["antenatal", "pregnancy"],
                            response: "This pregnancy was uneventful except for a mild flu-like illness at 34 weeks."
                        },
                        {
                            id: "virology",
                            title: "virology",
                            triggers: ["booking bloods", "virology"],
                            response: "Booking bloods were unremarkable."
                        },
                        {
                            id: "antenatal-scans",
                            title: "antenatal scans",
                            triggers: ["scan", "ultrasound", "uss"],
                            response: "The antenatal scans were unremarkable.",
                        },
                        {
                            id: "past-medical-history",
                            title: "past medical history",
                            triggers: ["medication", "drugs", "dhx", "maternal medical", "past medical", "pmh", "meds", "complication"],
                            response: "No maternal medication or signficiant past medical history."
                        },
                        {
                            id: "birth-history",
                            title: "birth history",
                            triggers: ["delivery", "birth", "perinatal", "delivered", "born", "section", "vaginal", "lscs", "labour"],
                            response: "Spontaneous onset of labour. SVD at 37 weeks."
                        },
                        {
                            id: "risk factors",
                            title: "risk factors for infection",
                            triggers: ["risk factors", "red flags", "sepsis", "rom", "membranes", "waters", "gbs", "strep", "fever", "temperature", "swabs", "infection", "antibiotics", "abx", "unwell", "flu", "covid"],
                            response: "There were no risk factors for sepsis. Mild febrile illness (flu-like) at 34 weeks gestation - not reviewed."
                        },
                        {
                            id: "feeding",
                            title: "feeding",
                            triggers: ["feed", "milk", "breast", "expressing", "bf", "ebm", "bottle", "formula"],
                            response: "The baby has not really shown any interest in feeding so far. He has been given a couple of syringes of EBM."
                        },
                        {
                            id: "behaviour",
                            title: "baby's behaviour",
                            triggers: ["behaviour", "alert", "drows", "sleep", "quiet", "irritable", "floppy", "settle"],
                            response: "Baby has been quiet and mostly sleeping, mum's first baby so not sure what's normal"
                        }
                    ]
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "Next you examine the baby.",
                    excludeFromNotes: true,
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                },
                {
                    id: "input_textarea-2",
                    type: 'input_textarea',
                    text: "Type in what you'd like to examine then click submit.",
                    keywords: [
                        {
                            id: "airway",
                            title: "airway",
                            triggers: ["airway", "stridor"],
                            response: "Airway patent, no additional sounds."
                        },
                        {
                            id: "breathing",
                            title: "breathing",
                            triggers: ["breathing", "recession", "indrawing", "pnoea", "respiratory", "grunting", "respiratory", "work of breathing", "wob", "recession", "apnoea", "cyanos", "blue", "colour", "oxygen", "hypoxia"],
                            response: "No increased work of breathing."
                        },
                        {
                            id: "respiratory-rate",
                            title: "respiratory rate",
                            triggers: ["rr", "respiratory"],
                            response: "Respiratory rate is 70."
                        },
                        {
                            id: "obs",
                            title: "obs",
                            triggers: ["obs", "vitals"],
                            response: "Click here to view the observation chart."
                        },
                        {
                            id: "temperature",
                            title: "temperature",
                            triggers: ["cool", "cold", "hypothermia", "temperature", "hot", "warm", "fever", "febrile"],
                            response: "Baby has a temperature of 36.5°C."
                        },
                        {
                            id: "cardiac",
                            title: "cardiac",
                            triggers: ["cardiac", "murmur", "rhythm"],
                            response: "The cardiac examination is normal."
                        },
                        {
                            id: "perfusion",
                            title: "perfusion",
                            triggers: ["perfusion", "circulation", "cap refil", "capillary refil", "crt"],
                            response: "The baby is warm and well perfused with no mottling. The CRT is <2s."
                        },
                        {
                            id: "heart-rate",
                            title: "heart rate",
                            triggers: ["hr", "heart rate", "cardia"],
                            response: "The heart rate is 150."
                        },
                        {
                            id: "blood-pressure",
                            title: "blood pressure",
                            triggers: ["bp", "pressure", "tensive"],
                            response: "The blood pressure is 60/35."
                        },
                        {
                            id: "neurological",
                            title: "neurological",
                            triggers: ["neuro", "alert", "drows", "pupil", "fontanelle", "movement", "conscious", "sleep", "reflex", "tone", "posture", "floppy", "responsive", "handling", "encephalopathy", "quiet", "wake", "waking", "irritable", "cry", "crying", "seizure", "fontanelle"],
                            response: "Baby quiet in mum's arms, but resposive on handling."
                        },
                        {
                            id: "exposure",
                            title: "exposure",
                            triggers: ["examine", "examination", "rash", "skin", "expose", "undress", "uncover", "clothing", "strip"],
                            response: "Image - blanching macular rash."
                        }
                    ],
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: ">",
                                require: 0
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
                        {
                            target: {
                                id: "input_textarea-2"
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
        {
            id: "decision-point-1",
            title: "Decision point",
            contents: [
                {
                    id: "input_textarea-1",
                    type: "input_textarea",
                    text: "Please record your current thoughts about the case. You could write this as the impression/differential section of a notes entry and will be able to refer back to your entry later.",
                    keywords: []
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
            id: "investigations",
            title: "Investigations",
            contents: [
                {
                    id: "investigations-checkbox",
                    type: "input_checkbox",
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
                    type: "input_textarea",
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
                    type: "text_paragraph",
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
                    type: "text_paragraph",
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
                    type: "text_paragraph",
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
                    type: "text_paragraph",
                    text: "End of scenario"
                }
            ]
        }
    ]
}