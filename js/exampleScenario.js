var scenario = {
    //object with config and nodes objects
    //required
    title: "Example Scenario",
        //string renders at the top of the page
        //required
    subtitle: "An example of how to create a scenario object with comments to guide usage",
        //string renders below the title
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
                inputCheckbox: {
                    defaultScore: {
                        recommended: 10,
                        //integer defines score for selected recommended checkbox is not defined in checkbox object
                        //required
                        notRecommended: -10
                        //integer defines score for selected not recommended checkbox is not defined in checkbox object
                        //required
                    }
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
            id: "example-name",
                //string identifies the node object
                //required for each node object - must be unique within scenario - kebab case
            title: "Example",
                //string renders at top of the content area
                //required for each node object
            contents: [
                //array of content objects which will be rendered in order into the content area
                //required for each node object
                { 
                    //object which defines the content appearance and behaviour
                    //minimum 1 required within contents array
                    id: "text-example-1",
                        //string identifies the content object
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
                    id: "heading-example-1",
                    type: "h",
                        //'h' type creates heading
                    text: "This is a heading"
                        //string renders within <h3> tags
                },
                {
                    id: "img-example",
                    type: "img",
                        //'img' type creates image content shown centered within content area
                    text: "An example image",
                        //string defines hover text for the image, and the link text when shown in the casenotes
                        //required for content type 'img'
                    path: "example.jpg",
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
                },
                {
                    id: "keyword-example",
                    type: "inputTextarea",
                        //'inputTextarea' creates a textarea input with a submit button which will (optionally) test the user entry against defined keywords
                    text: "Please enter some text:",
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
                                "example trigger 1",
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
                    text: "Please select from these options:",
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
                        }
                    ]
                }
            ],
            options: [
                //array of option objects will be rendered below the content area
                //required for each node object
                {
                    //object defines option appearance and behaviour
                    id: "my-option",
                        //identifies the option object
                        //required for each option object - must be unique within options array
                    title: "My option",
                        //string renders as text on button
                        //required for each option object
                    class: "btn-secondary",
                        //string defines class(es) of option button
                        //options include btn-secondary, btn-success, btn-warning etc
                        //optional - if not defined will default to btn-primary
                    goTo: "example-name-2",
                        //string defines name of node to move to if this option is clicked
                        //optional - if not defined will default to next node in array
                    score: 15,
                        //integer defines score for selecting this option, is only applied once even if option is selected multiple times, can be positive or negative
                        //optional - if not defined the score will not change when the option is selected
                    conditions: [
                        //array of conditions which must all evaluate to true before this option is displayed
                        //optional - if not defined option will be visible by default
                        {
                            //object defines a condition which must evaluate to true before object is shown
                            //minimum 1 required within conditions array if conditions array is defined
                            target: {
                                //object defines object to become subject of test
                                //required for each condition object
                                id: "keyword-example",
                                    //string id of object to test
                                    //required
                                in: "contents",
                                    //string defines what array to search for the object within
                                    //options 'nodes', 'contents', 'options'
                                    //optional - if not defined defaults to contents
                                nodeName: "example-name"
                                    //string defines name of node object which contains the target object
                                    //optional - if not defined defaults to current node. Ignored if type = 'node'
                            },
                            test: {
                                //object defines test to perform on target
                                //required for each condition object
                                methodName: "checkedCount",
                                    //string defines a function to perform on the defined content which will return a value to compare against the requirement
                                    /*options:
                                        - for nodes:
                                            methodName: visitCount
                                                set require to an integer, set operator to >, < or =
                                        - for content
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
                                    //required for each test object
                                operator: ">",
                                    //string defines operator for comparison of test requirement against returned value of test name
                                    //optional - if not defined test will pass if defined test name returns 'true'
                                require: 0
                                    //integer defines value to compare against returned value of defined test using defined operator
                                    //optional unless method requires it or if test operator defined
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