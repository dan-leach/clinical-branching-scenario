let scenario = {
    title: "Respiratory distress",
    subtitle: "Practise your decision making with this pre-school respiratory distress presentation.",
    config: {
        development: {
            developerPanelVisible: true,
            startNode: 0
        },
        nodes: {
            //object of configuration options relating to nodes
            //required
            contents: {
                //object of configuration options relating to contents of nodes
                //required
                input_textarea: {
                    //object of configuration options relating to input_textarea content objects
                    //required
                    minLength: 10,
                        //integer defines minimum length in characters of user entry
                        //required
                    defaultScore: 0
                        //integer defines score for finding keyword if not defined in keyword object
                        //required
                },
                input_checkboxes: {
                    defaultScore: {
                        recommended: 0,
                        //integer defines score for selected recommended checkbox if not defined in checkbox object
                        //required
                        notRecommended: 0
                        //integer defines score for selected not recommended checkbox if not defined in checkbox object
                        //required
                    }
                },
                input_radios: {
                    defaultScore: {
                        recommended: 0,
                        //integer defines score for selected recommended radio if not defined in radio object
                        //required
                        notRecommended: 0
                        //integer defines score for selected not recommended radio if not defined in radios object
                        //required
                    }
                }
            }
        }
    },
    state: {
        user: {
            grade: ""
        },
        patient: {
            
        }
    },
    nodes: [
        {
            id: "welcome",
            title: "Welcome",
            excludeFromNotes: true,
            contents: [
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "Welcome to this clinical decision-making learning package. By working through this scenario you can safely learn from mistakes. In contrast to face-to-face simulation, there's no time pressure which should allow you to reflect on how you reach your decisions."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "doctor_laptop.jpg",
                            text: "A doctor using a laptop",
                            colWidth: "7"
                        }
                    ]
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "You'll get feedback at several points along the way and at the end of the scenario. You can repeat this scenario if you like to see how the case evolves when you make different choices."
                },
                {
                    id: "layout_spacer-1",
                    type: "layout_spacer",
                    size: 5
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "Click 'Next' to continue..."
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
            id: "select-role",
            title: "Select role",
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
                        }
                    ]
                }
            ]
        },
        {
            id: "setting",
            title: "Scenario setting",
            contents: [
                {
                    id: "text_heading-1",
                    type: "text_heading",
                    level: 1,
                    text: "Situation"
                },
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "You are a paediatric junior working in a district general hospital. You answer the referral bleep for your registrar who is running a resuscitation on the ward. A triage nurse in ED is calling regarding a child with respiratory distress.",
                    conditions: [
                        {
                            target: {
                                id: ["user","grade"],
                                in: "state"
                            },
                            test: {
                                methodName: "value",
                                operator: "=",
                                require: "sho"
                            }
                        }
                    ]
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "You are a paediatric registrar working in a district general hospital. You answer the referral bleep. A triage nurse in ED is calling regarding a child with respiratory distress.",
                    conditions: [
                        {
                            target: {
                                id: ["user","grade"],
                                in: "state"
                            },
                            test: {
                                methodName: "value",
                                operator: "=",
                                require: "reg"
                            }
                        }
                    ]
                },
                {
                    id: "text_paragraph-3",
                    type: "text_paragraph",
                    text: "You are a paediatric consultant working in a district general hospital. Your registrar has called you for help regarding a child with respiratory distress in ED.",
                    conditions: [
                        {
                            target: {
                                id: ["user","grade"],
                                in: "state"
                            },
                            test: {
                                methodName: "value",
                                operator: "=",
                                require: "cons"
                            }
                        }
                    ]
                },
                {
                    id: "text_heading-2",
                    type: "text_heading",
                    level: 1,
                    text: "Background"
                },
                {
                    id: "text_paragraph-4",
                    type: "text_paragraph",
                    text: "Jim is a 3 year old child who has been unwell for around 24 hours. He has had a runny nose and is described as 'generally out of sorts'. Jim has been brought in by his mother who is concerned about his breathing."
                },
                {
                    id: "text_heading-3",
                    type: "text_heading",
                    level: 1,
                    text: "Assessment"
                },
                {
                    id: "text_paragraph-5",
                    type: "text_paragraph",
                    text: "Jim observations are: respiratory rate 35, SpO2 90-93%, HR 120, BP 105/60."
                },
                {
                    id: "text_heading-4",
                    type: "text_heading",
                    level: 1,
                    text: "Recommendation"
                },
                {
                    id: "text_paragraph-6",
                    type: "text_paragraph",
                    text: "The triage nurse is concerned about the child and would like you to come down to the department to review them."
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next"
                }
            ]
        }
    ]
}