let scenario = {
    title: "Demonstration Scenario",
    subtitle: "Technical demonstration of the clinical branching scenario application",
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
                            text: "Welcome to this branching scenario. This version will demonstrate the capabilities of the application and provide an introduction to what is required to create a scenario."
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
            id: "scenario-structure",
            title: "Scenario Structure",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "An immersive and compelling scenario will provide the user with information and choices. The choices they make will change how the scenario progresses. To build this scenario we need to break up the scenario into parts.",
                    excludeFromNotes: true
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "We'll refer to each part of a scenario as a node."
                },
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "This diagram represents the node-based structure of a scenario. In this example, progression through the first couple of nodes is linear, but later choices the user makes will taken them on very different paths through the scenario. Sometimes this might mean revisiting certain nodes, or reaching a different scenario ending, depending on their decision making."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "scenario_structure.jpeg",
                            text: "Diagram of the node-based structure of a scenario",
                            caption: {
                                text: "Diagram of the node-based structure of a scenario"
                            },
                            colWidth: "8"
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "welcome"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "node-structure",
            title: "Node Structure",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "We've established that a scenario is made up of nodes, and a user progresses through that scenario by moving from node to node. But what is a node?",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "A node is a step along the pathway that makes up a scenario. Each time an option button at the bottom is clicked, the user moves from one node to another.",
                    excludeFromNotes: true
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "A node is principally made up of contents and options."
                },
                {
                    id: "media_image-1",
                    type: "media_image",
                    path: "node_structure.jpeg",
                    text: "Diagram of the structure of a node",
                    caption: {
                        text: "Diagram of the structure of a node"
                    }
                },
                
                {
                    id: "text_paragraph-3",
                    type: "text_paragraph",
                    text: "A node also has some other properties, such as a title. The node you're viewing right now has the title 'Node Structure' which appears in the header of the main panel.",
                    excludeFromNotes: true
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "scenario-structure"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "node-contents",
            title: "Node Contents",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "Each content element appears in the body of the main panel. For example, this paragraph is a content element of the current node.",
                    excludeFromNotes: true
                },
                {
                    id: "text_bullets-1",
                    type: "text_bullets",
                    text: "There are various differnt types of content elements that we can use:",
                    items: [
                        "Paragraph text",
                        "Headings (of various levels)",
                        "Images (optionally with captions)",
                        "Links",
                        "Bullet-point or numbered lists",
                        "Interactive elements"
                    ]
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "Look out for examples of different types of content elements as you progress through this demonstration.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "Content elements have various properties depending on their type which determine their appearance and behaviour. For example, a heading element has the property 'level' which can have a value of 1, 2 or 3 to change the size of the heading.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-3",
                    type: "text_paragraph",
                    text: "It's likely that more types of content elements will need to be created as development progresses.",
                    excludeFromNotes: true
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "node-structure"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "node-options",
            title: "Node Options",
            excludeFromNotes: true,
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "Each option appears in the footer of the main panel. When the user selects an option it takes them to a particular node. All the options that you've seen so far have been either 'Next' or 'Back'."
                },
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "We'll now demonstrate how you can change the way a user progresses through the scenario with the use of options. This diagram show how the options below can take you through a pathway of nodes in different ways."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "example_options_start.jpeg",
                            text: "Options demonstration diagram",
                            caption: {
                                text: "Options demonstration diagram"
                            },
                            colWidth: 8
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "node-contents"
                },
                {
                    id: "option-1",
                    title: "Option 1",
                    goTo: "options-demo-1"
                },
                {
                    id: "option-2",
                    title: "Option 2",
                    goTo: "options-demo-2"
                },
                {
                    id: "option-3",
                    title: "Option 3",
                    goTo: "options-demo-3"
                }
            ]
        },
        {
            id: "options-demo-1",
            title: "Options Demo - Option 1",
            excludeFromNotes: true,
            contents: [
                {
                    id: "media_image-1",
                    type: "media_image",
                    path: "example_options_1.jpeg",
                    text: "Options demonstration diagram"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next",
                    goTo: "options-demo-end"
                }
            ]
        },
        {
            id: "options-demo-2",
            title: "Options Demo - Option 2",
            excludeFromNotes: true,
            contents: [
                {
                    id: "media_image-1",
                    type: "media_image",
                    path: "example_options_2.jpeg",
                    text: "Options demonstration diagram"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next",
                    goTo: "options-demo-end"
                }
            ]
        },
        {
            id: "options-demo-3",
            title: "Options Demo - Option 3",
            excludeFromNotes: true,
            contents: [
                {
                    id: "media_image-1",
                    type: "media_image",
                    path: "example_options_3.jpeg",
                    text: "Options demonstration diagram"
                }
            ],
            options: [
                {
                    id: "next",
                    title: "Next",
                    goTo: "options-demo-end"
                }
            ]
        },
        {
            id: "options-demo-end",
            title: "Options Demo - End",
            excludeFromNotes: true,
            contents: [
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "Hopefully you can see how your decisions can change the way you progress through this scenario. This is clearly a very simple pathway, but it could be much more complex if required to reflect the complexity of real-world clinical decision making.",
                        },
                        {
                            id: "media-image-1",
                            type: "media_image",
                            path: "example_options_end.jpeg",
                            text: "Options demonstration diagram",
                            caption: {
                                text: "Options demonstration diagram"
                            },
                            colWidth: 8
                        }
                    ]
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "You can click 'Back' to restart the Example Options Path and try a different route."
                },
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "Once you're finished with this Example Options Path, click 'Next' to move on."
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "node-options"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "review-1",
            title: "Review",
            excludeFromNotes: true,
            contents: [
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "Let's briefly review what we've covered so far."
                },
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "A scenario is made up of nodes. The nodes are linked together to create a pathway which determines how the scenario progresses."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "scenario_structure.jpeg",
                            text: "Diagram of the node-based structure of a scenario",
                            caption: {
                                text: "Diagram of the node-based structure of a scenario"
                            },
                            colWidth: "8"
                        }
                    ]
                },
                {
                    id: "layout_columns-2",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "Each node is made up of contents and options. The contents are what will be displayed to the user. The user chooses between the options which will determine which node they arrive at next."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "node_structure.jpeg",
                            text: "Diagram of the structure of a node",
                            caption: {
                                text: "Diagram of the structure of a node"
                            },
                            colWidth: 8
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "options-demo-end"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "conditions-1",
            title: "Conditions",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "Sometimes we might want to show certain content elements or options in certain conditions. For example, you might want to provide certain clinical findings or a particular option to a user who made a specific decision earlier on in the scenario."
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "Adding conditions to a content element or option will hide it unless/until that condition is met."
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "For example, some text will appear below depending on what path or paths you took through the Example Options Path earlier.",
                    excludeFromNotes: true
                },
                {
                    id: "text_emphasis-2",
                    type: "text_emphasis",
                    excludeFromNotes: true,
                    text: "You took a path through option 1.",
                    conditions: [
                        {
                            target: {
                                id: "options-demo-1",
                                in: "nodes"
                            },
                            test: {
                                methodName: "visitCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                },
                {
                    id: "text_emphasis-3",
                    type: "text_emphasis",
                    excludeFromNotes: true,
                    text: "You took a path through option 2.",
                    conditions: [
                        {
                            target: {
                                id: "options-demo-2",
                                in: "nodes"
                            },
                            test: {
                                methodName: "visitCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                },
                {
                    id: "text_emphasis-4",
                    type: "text_emphasis",
                    excludeFromNotes: true,
                    text: "You took a path through option 3.",
                    conditions: [
                        {
                            target: {
                                id: "options-demo-3",
                                in: "nodes"
                            },
                            test: {
                                methodName: "visitCount",
                                operator: ">",
                                require: 0
                            }
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "review-1"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "interactive-elements-1",
            title: "Interactive elements (Part 1)",
            contents: [
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    excludeFromNotes: true,
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "Earlier, we mentioned different types of contents. In addition to the static types such as text or images, we can create interactive elements. This can be a useful way to encourage user engagement, but when combined with conditions can be a particularly powerful way to make a scenario respond to a users decisions."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "interactive_element_example_not_met.jpeg",
                            text: "Example interactive element diagram with keywords and conditions",
                            caption: {
                                text: "Example interactive element diagram with keywords and conditions"
                            },
                            colWidth: 8
                        }
                    ],
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: "<",
                                require: 3
                            }
                        }
                    ]
                },
                {
                    id: "layout_columns-2",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-2",
                            type: "text_paragraph",
                            text: "Earlier, we mentioned different types of contents. In addition to the static types such as text or images, we can create interactive elements. This can be a useful way to encourage user engagement, but when combined with conditions can be a particularly powerful way to make a scenario respond to a users decisions."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "interactive_element_example_met.jpeg",
                            text: "Example interactive element diagram with keywords and conditions",
                            caption: {
                                text: "Example interactive element diagram with keywords and conditions"
                            },
                            colWidth: 8
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
                                require: 2
                            }
                        }
                    ]
                },
                {
                    id: "input_textarea-1",
                    type: "input_textarea",
                    excludeFromNotes: true,
                    text: "Example: Please enter the names of as many of the planets of our solar system as you can:",
                    keywords: [
                        {
                            id: "mercury",
                            title: "mercury",
                            triggers: ["mercury"],
                            response: "Mercury's craters are named after famous artists, musicians and authors."
                        },
                        {
                            id: "venus",
                            title: "venus",
                            triggers: ["venus"],
                            response: "Venus is the hottest planet in the solar system."
                        },
                        {
                            id: "earth",
                            title: "earth",
                            triggers: ["earth"],
                            response: "Earth's atmosphere protects us from meteoroids and radiation from the Sun."
                        },
                        {
                            id: "mars",
                            title: "mars",
                            triggers: ["mars"],
                            response: "There have been more missions to Mars than any other planet."
                        },
                        {
                            id: "jupiter",
                            title: "jupiter",
                            triggers: ["jupiter"],
                            response: "Jupiter has more than double the mass of all the other planets combined."
                        },
                        {
                            id: "saturn",
                            title: "saturn",
                            triggers: ["saturn"],
                            response: "Saturn has more moons than any other planet in the Solar System."
                        },
                        {
                            id: "uranus",
                            title: "uranus",
                            triggers: ["uranus"],
                            response: "Uranus has only been visited by a single spacecraft, Voyager 2."
                        },
                        {
                            id: "neptune",
                            title: "neptune",
                            triggers: ["neptune"],
                            response: "It takes like more than 4 hours for light to reach Neptune from the Sun."
                        },
                        {
                            id: "pluto",
                            title: "pluto",
                            trigger: ["pluto"],
                            response: "I hate to break it to you, but pluto isn't a planet!"
                        }
                    ]
                },
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    excludeFromNotes: true,
                    text: "This is an example of a textarea input, which is a type of content element. We can define keywords which will generate certain responses. This is a good way of making users thing about what information they need, or what actions they'd like to take. This way, the user only finds out information they've asked for and can only choose options they've thought of which is more like real clinical decision making."
                },
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    excludeFromNotes: true,
                    text: "The 'Next' button won't appear until you've identified at least 3 planets!"
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "conditions-1"
                },
                {
                    id: "next",
                    title: "Next",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordFoundCount",
                                operator: ">",
                                require: 2
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "interactive-elements-2",
            title: "Interactive elements (Part 2)",
            excludeFromNotes: true,
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "The previous node showed you a textarea input. The 'Next' button had a condition which meant it only appeared once you'd named 3 or more planets. You can also make options appear depending on which specific keywords are identified."
                },
                {
                    id: "input_textarea-1",
                    type: "input_textarea",
                    text: "Example: Please enter which antibiotic you'd like to give for line-related sepsis:",
                    keywords: [
                        {
                            id: "cefotaxime",
                            title: "cefotaxime",
                            triggers: ["cefotax"]
                        },
                        {
                            id: "ceftriaxone",
                            title: "ceftriaxone",
                            triggers: ["ceftri"]
                        },
                        {
                            id: "amoxicillin",
                            title: "amoxicillin",
                            triggers: ["amox"]
                        },
                        {
                            id: "benzylpenicillin",
                            title: "benzylpenicillin",
                            triggers: ["benzylpenicillin", "benpen"]
                        },
                        {
                            id: "gentamicin",
                            title: "gentamicin",
                            triggers: ["gent"]
                        },
                        {
                            id: "metronidazole",
                            title: "metronidazole",
                            triggers: ["metro"]
                        },
                        {
                            id: "vancomycin",
                            title: "vancomycin",
                            triggers: ["vanc"]
                        }
                    ]
                },
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "interactive-elements-1"
                },
                {
                    id: "cefotaxime",
                    title: "Cefotaxime",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "cefotaxime"
                            }
                        }
                    ]
                },
                {
                    id: "ceftriaxone",
                    title: "Ceftriaxone",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "ceftriaxone"
                            }
                        }
                    ]
                },
                {
                    id: "amoxicillin",
                    title: "Amoxicillin",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "amoxicillin"
                            }
                        }
                    ]
                },
                {
                    id: "benzylpenicillin",
                    title: "Benzylpenicillin",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "benzylpenicillin"
                            }
                        }
                    ]
                },
                {
                    id: "gentamicin",
                    title: "Gentamicin",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "gentamicin"
                            }
                        }
                    ]
                },
                {
                    id: "metronidazole",
                    title: "Metronidazole",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "metronidazole"
                            }
                        }
                    ]
                },
                {
                    id: "vancomycin",
                    title: "Vancomycin",
                    conditions: [
                        {
                            target: {
                                id: "input_textarea-1"
                            },
                            test: {
                                methodName: "keywordIsFound",
                                require: "vancomycin"
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: "interactive-elements-3",
            title: "Interactive elements (Part 3)",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "You've now seen how a textarea input can be used to provide the user with new information or enable options, depending on the user's entry. Other input types include checkboxes and radio buttons."
                },
                {
                    id: "input_checkboxes-1",
                    type: "input_checkboxes",
                    excludeFromNotes: true,
                    text: "Please select one or more options:",
                    checkboxes: [
                        {
                            id: "option-1",
                            title: "Option 1",
                            response: "You selected option 1."
                        },
                        {
                            id: "option-2",
                            title: "Option 2",
                            response: "You selected option 2."
                        },
                        {
                            id: "option-3",
                            title: "Option 3",
                            response: "You selected option 3."
                        }
                    ]
                },
                {
                    id: "input_radios-1",
                    type: "input_radios",
                    excludeFromNotes: true,
                    text: "Please select an option:",
                    radios: [
                        {
                            id: "option-1",
                            title: "Option 1",
                            response: "You selected option 1."
                        },
                        {
                            id: "option-2",
                            title: "Option 2",
                            response: "You selected option 2."
                        },
                        {
                            id: "option-3",
                            title: "Option 3",
                            response: "You selected option 3."
                        }
                    ]
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "interactive-elements-2"
                },
                {
                    id: "next",
                    title: "Next",
                    conditions: [
                        {
                            target: {
                                id: "input_checkboxes-1"
                            },
                            test: {
                                methodName: "checkedCount",
                                operator: ">",
                                require: 0
                            }
                        },
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
            id: "review-2",
            title: "Review",
            contents: [
                {
                    id: "text_emphasis-1",
                    type: "text_emphasis",
                    text: "Let's briefly review what we've covered so far.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "A scenario is made up of nodes. The nodes are linked together to create a pathway which determines how the scenario progresses.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "Each node is made up of contents and options. The contents are what will be displayed to the user. The user chooses between the options which will determine which node they arrive at next.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-3",
                    type: "text_paragraph",
                    text: "You can engage the user with interactive content elements, such as textarea, checkbox and radio button inputs."
                },
                {
                    id: "text_bullets-1",
                    type: "text_bullets",
                    text: "You can use conditions to show or hide content elements or options. Examples of conditions include:",
                    items: [
                        "If a particular node has been visited, or how many times",
                        "If a particular content element has been seen",
                        "If a required number of keywords in a textarea input have been found",
                        "If a particular keyword in a textarea input has been found",
                        "If a required number of options have been selected in a checkbox/radio buttons input",
                        "If a particular option has been selected in a checkbox/radio buttons input",
                        "If a particular option button has been chosen, or how many times",
                        "And more..."
                    ]
                },
                {
                    id: "layout_columns-1",
                    type: "layout_columns",
                    columns: [
                        {
                            id: "text_paragraph-1",
                            type: "text_paragraph",
                            text: "This diagram structure of a node. In this version you can see how content elements or options can be visible or hidden depending on if their conditions are met."
                        },
                        {
                            id: "media_image-1",
                            type: "media_image",
                            path: "node_structure_with_conditions.jpeg",
                            text: "Diagram of the structure of a node with conditions",
                            caption: {
                                text: "Diagram of the structure of a node with conditions"
                            },
                            colWidth: "8"
                        }
                    ]
                },
                {
                    id: "text_paragraph-4",
                    type: "text_paragraph",
                    text: "Conditions can refer to content or options in the current node, or in any other node in the scenario."
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "interactive-elements-3"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "about-the-case-notes-panel",
            title: "About the case-notes panel",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "After you move on from a node, useful information can be recorded in the case notes panel on the right. This allows users to refer back to information they found out earlier in the scenario."
                },
                {
                    id: "text_paragraph-2",
                    type: "text_paragraph",
                    text: "You can exclude either entire nodes, or certain content elements from the case notes, to prevent them from getting too crowded."
                },
                {
                    id: "text_paragraph-3",
                    type: "text_paragraph",
                    text: "For example, when you move on from this node, this paragraph of text will not appear in the case notes as it is set to be excluded.",
                    excludeFromNotes: true
                },
                {
                    id: "text_paragraph-4",
                    type: "text_paragraph",
                    text: "Certain content will appear differently in the case notes panel compared to the main content panel. For example, images from the main area are entered into the case notes panel with a text description and a link to open the image."
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "review-2"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
   
        {
            id: "about-the-developer-panel",
            title: "About the developer panel",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "At the bottom of the page is a developer panel that provides some useful information while you're creating a scenario. This panel is only visible during scenario development. I'll add more details about this later."
                }
            ],
            options: [
                {
                    id: "back",
                    title: "Back",
                    class: "btn-danger",
                    goTo: "about-the-case-notes-panel"
                },
                {
                    id: "next",
                    title: "Next"
                }
            ]
        },
        {
            id: "end",
            title: "End",
            contents: [
                {
                    id: "text_paragraph-1",
                    type: "text_paragraph",
                    text: "This is the end of the demonstration scenario."
                },
                {
                    id: "text_bullets-1",
                    type: "text_bullets",
                    text: "This demonstration has covered:",
                    items: [
                        "That a scenario is made up of nodes which users move through depending on their decision making.",
                        "A node has content elements of different types which provided information to the user, or allow them to interact with the scenario.",
                        "A node also has options which the user can choose between and will determine the next node visited.",
                        "Both content elements and options can have conditions which must be met before they are shown to the user.",
                        "By creating a network of nodes and controlling the way a user moves through them with options and conditions, a scenario can be created reflecting the complex nature of clinical decision making."
                    ]
                }
            ],
            options: []
        }
    ]
}