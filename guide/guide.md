To do:
- conditons
- once only (inputs and options)
- options

## Scenario definition guide

The branching scenario platform can be used to create immersive clinical scenarios. Scenario developers must create explcit rules to shape the way users can progress through the scenario and how the platform should respond to inputs and decisions.

Creating a scenario means creating a scenario definition object using JSON. You can expand the schema below to see the nested property structure that makes up a scenario definition. Each property in the schema includes details about its purpose, if it is required or optional, and the expected data type.

## Definition schema

> <details><summary>scenario</summary>
>
> `object | required`
>
> Defines the appearance and behaviour of the scenario.
>>
>> <details><summary>title</summary>
>>
>> `string | required`
>>
>> The principle title/name of the scenario.
>>
>> Displays at the top of the window.
>> </details>
>>
>> <details><summary>subtitle</summary>
>>
>> `string | optional`
>>
>> The secondary title/strapline of the scenario.
>>
>> Displays below the title, at the top of the window.
>> </details>
>>
>> <details><summary>config</summary>
>>
>> `object | required`
>>
>> Changes the behaviour of the scenario such as default scores or enabling developer mode.
>>>
>>> <details><summary>development</summary>
>>>
>>> `object | required`
>>>
>>> Configuration settings related to developer mode.
>>>>
>>>> <details><summary>developerPanelVisible</summary>
>>>>
>>>> `boolean | optional (default false)`
>>>> 
>>>> Sets the visibility of the developer panel at the bottom of the window.
>>>> </details>
>>>>
>>>> <details><summary>startNode</summary>
>>>>
>>>> `integer | optional (default 0)`
>>>>
>>>> The index of the node to show when the scenario starts.
>>>> </details>
>>>>
>>> </details>
>>> <details><summary>nodes</summary>
>>>
>>> `object | required`
>>>
>>> Configuration settings related to nodes and objects they contain.
>>>>
>>>> <details><summary>contents</summary>
>>>>
>>>> `object | required`
>>>>
>>>> Configuration settings related to content elements.
>>>>>
>>>>> <details><summary>input_textarea</summary>
>>>>>
>>>>> `object | required`
>>>>>
>>>>> Configuration settings related to input_textarea components.
>>>>>>
>>>>>> <details><summary>minLength</summary>
>>>>>>
>>>>>> `integer | required`
>>>>>>
>>>>>> The minimum number of characters required for a input_textarea to be submitted.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>defaultScore</summary>
>>>>>>
>>>>>> `integer | required`
>>>>>>
>>>>>> The score assigned for each keyword matched by the user if a custom score for that keyword is not defined.
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>input_checkbox</summary>
>>>>>
>>>>> `object | required`
>>>>>
>>>>> Configuration settings related to input_checkbox components.
>>>>>>
>>>>>> <details><summary>defaultScore</summary>
>>>>>>
>>>>>> `object | required`
>>>>>>
>>>>>> Defines the score assigned for each checkbox selected by the user if a custom score for that checkbox is not defined.
>>>>>>>
>>>>>>> <details><summary>recommended</summary>
>>>>>>>
>>>>>>> `integer | required`
>>>>>>>
>>>>>>> The default score for a checkbox if it has the property `recommended: true` or `recommended: undefined`.
>>>>>>> </details>
>>>>>>>
>>>>>>> <details><summary>notRecommended</summary>
>>>>>>>
>>>>>>> `integer | required`
>>>>>>>
>>>>>>> The default score for a checkbox if it has the property `recommended: false`.
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>input_radios</summary>
>>>>>
>>>>> `object | required`
>>>>>
>>>>> Configuration settings related to input_radios components.
>>>>>>
>>>>>> <details><summary>defaultScore</summary>
>>>>>>
>>>>>> `object | required`
>>>>>>
>>>>>> Defines the score assigned for a radio button selected by the user if a custom score for that radio button is not defined.
>>>>>>>
>>>>>>> <details><summary>recommended</summary>
>>>>>>>
>>>>>>> `integer | required`
>>>>>>>
>>>>>>> The default score for a radio button if it has the property `recommended: true` or `recommended: undefined`.
>>>>>>> </details>
>>>>>>>
>>>>>>> <details><summary>notRecommended</summary>
>>>>>>>
>>>>>>> `integer | required`
>>>>>>>
>>>>>>> The default score for a radio button if it has the property `recommended: false`.
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>> </details>
>>>>
>>> </details>
>>>
>> </details>
>>
>> <details><summary>state</summary>
>>
>> `object | optional`
>>
>> Required only if using the state management feature of the branching scenario platform. The scenario creator can define a structure for the state object using JSON which can be as complex as required.
>>
>> For example, state might contain the objects `user`, `environment` and `patient` each of which contain their own data which changes in response to a users interaction with the scenario.
>> </details>
>>
>> <details><summary>nodes</summary>
>>
>> `array | required`
>>
>> Contains the node objects through which the user moves as the progress through the scenario.
>>>
>>> <details><summary>node</summary>
>>>
>>> `object | required (minimum 1 within nodes array)`
>>>
>>> Each node object within the nodes array defines a step on a path through the scenario.
>>>>
>>>> <details><summary>id</summary>
>>>>
>>>> `string | required | unique (amongst node objects in nodes array) | no spaces`
>>>>
>>>> Identifies the node. Used for conditional tests.
>>>> </details>
>>>>
>>>> <details><summary>title</summary>
>>>>
>>>> `string | required`
>>>>
>>>> Appears at the top of the main content panel when the node is active.
>>>> </details>
>>>>
>>>> <details><summary>contents</summary>
>>>>
>>>> `array | optional`
>>>>
>>>> Contains the content objects which appear in the middle of the main content panel. If not defined the contents area for the node will be blank.
>>>>
>>>> *Schema of properties for ALL content objects:*
>>>>>
>>>>> <details><summary>content</summary>
>>>>>
>>>>> `object | optional`
>>>>>
>>>>> Each content object within the contents array defines a element to appear in the main content area. These are rendered in order with the first defined object at the top. If no content objects are defined within the contents array for a node, the contents area for the node will be blank.
>>>>>>
>>>>>> <details><summary>id</summary>
>>>>>>
>>>>>> `string | required | unique (amongst content objects in contents array of current node) | no spaces`
>>>>>>
>>>>>> Identifies the content object. Used for conditional testing.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>type</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Defines the type of content amongst the available options:
>>>>>>
>>>>>> - `text_paragraph`
>>>>>> - `text_emphasis`
>>>>>> - `text_heading`
>>>>>> - `text_link`
>>>>>> - `text_bullets`
>>>>>> - `text_numbers`
>>>>>>
>>>>>> *Content object will have other properties dependent on property `type`, see below.*
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>excludeFromNotes</summary>
>>>>>>
>>>>>> `boolean | optional (default: false)`
>>>>>>
>>>>>> If `true` will prevent casenote entries being generated for the content object.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>excludeFromLog</summary>
>>>>>>
>>>>>> `boolean | optional (default: false)`
>>>>>>
>>>>>> If `true` will prevent log entries being generated for the content object.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>conditions</summary>
>>>>>>
>>>>>> `array | optional`
>>>>>>
>>>>>> Contains condition objects all of which must evaluate to `true` for the content element to be rendered. If one or more condition in the array evaluates to `false` the content element will not be rendered. If not provided then the content element will be rendered.
>>>>>>>
>>>>>>> <details><summary>condition</summary>
>>>>>>>
>>>>>>> `object | optional`
>>>>>>>
>>>>>>> Defines the condition which must evaluate to `true` for the parent content object to be rendered.
>>>>>>>>
>>>>>>>> <details><summary>target</summary>
>>>>>>>>
>>>>>>>> `object | required`
>>>>>>>>
>>>>>>>> Defines the object on which the conditional test is run.
>>>>>>>>> <details><summary>id</summary>
>>>>>>>>>
>>>>>>>>> `string | required`
>>>>>>>>>
>>>>>>>>> The id of the object on which the conditional test is run.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>>> <details><summary>in</summary>
>>>>>>>>>
>>>>>>>>> `string | optional (default: 'contents')`
>>>>>>>>>
>>>>>>>>> Defines the array in which to search for the target id. Options:
>>>>>>>>>
>>>>>>>>> - `contents` (default if property `in` not defined)
>>>>>>>>> - `nodes`
>>>>>>>>> - `options`
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>>> <details><summary>nodeId</summary>
>>>>>>>>>
>>>>>>>>> `string | optional`
>>>>>>>>>
>>>>>>>>> The node in which the target object is found. Has no effect if target object is in `nodes`. If undefined defaults to the current node.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>test</summary>
>>>>>>>>
>>>>>>>> `object | required`
>>>>>>>>
>>>>>>>> Defines the test to be performed on the target object.
>>>>>>>>>
>>>>>>>>> <details><summary>methodName</summary>
>>>>>>>>>
>>>>>>>>> `string | required`
>>>>>>>>>
>>>>>>>>> The name of the test to perform. Must be suitable for the target object.
>>>>>>>>> <br>Tests which can be performed on node objects:
>>>>>>>>>>
>>>>>>>>>> <details><summary>visitCount</summary>
>>>>>>>>>>
>>>>>>>>>> ***
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>> <br>Tests which can be performed on text_ objects:
>>>>>>>>>> <details><summary>seen</summary>
>>>>>>>>>>
>>>>>>>>>> ***
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>>> <details><summary>operator</summary>
>>>>>>>>>
>>>>>>>>> `string | optional`
>>>>>>>>>
>>>>>>>>> Only required if needed for the chosen `methodName`. Options:
>>>>>>>>>
>>>>>>>>> - `>`
>>>>>>>>> - `<`
>>>>>>>>> - `=`
>>>>>>>>>
>>>>>>>>> See under `methodName` for further details.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>>> <details><summary>require</summary>
>>>>>>>>>
>>>>>>>>> `string/integer/float | optional`
>>>>>>>>>
>>>>>>>>> Only required if needed for the chosen `methodName`. See under `methodName` for further details.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>> *Schema of properties for specific content types:*
>>>>>
>>>>> <br>Text-based elements:
>>>>> <details><summary>text_paragraph</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as regular paragraph text in the content area.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>bold</summary>
>>>>>>
>>>>>> `boolean | optional (default: false)`
>>>>>>
>>>>>> If `true` paragraph text will be **bold**.
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>text_emphasis</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as large italicised centered text in the content area.
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>text_heading</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as heading text in the content area.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>level</summary>
>>>>>>
>>>>>> `integer | required`
>>>>>>
>>>>>> Sets the size/importance for the heading text. Options:
>>>>>> - `1` (equivalent to `<h3>`)
>>>>>> - `2` (equivalent to `<h4>`)
>>>>>> - `3` (equivalent to `<h5>`)
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>center</summary>
>>>>>>
>>>>>> `boolean | optional (default: false)`
>>>>>>
>>>>>> If `true` heading will be horizontally centered in the content area.
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>text_link</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as text formatted as a link in the content area.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>link</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> A resolvable URL (absolute or relative) which will be opened in a new tab when the text is clicked.
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>text_bullets</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | optional`
>>>>>>
>>>>>> Rendered as regular paragraph text in the content area above the bullet points. If not defined the bullet points appear without preceeding paragraph.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>items</summary>
>>>>>>
>>>>>> `array | required`
>>>>>>
>>>>>> Contains the item strings to appear on each bullet point. Rendered in order with the first item in the array appearing at the top of the list.
>>>>>>>
>>>>>>> <details><summary>item</summary>
>>>>>>>
>>>>>>> `string | required (minimum 1 within array items)`
>>>>>>>
>>>>>>> The text which appears for this bullet point.
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>text_numbers</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | optional`
>>>>>>
>>>>>> Rendered as regular paragraph text in the content area above the numbered points. If not defined the numbered points appear without preceeding paragraph.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>items</summary>
>>>>>>
>>>>>> `array | required`
>>>>>>
>>>>>> Contains the item strings to appear on each numbered point. Rendered in order with the first item in the array as number 1 on the list.
>>>>>>>
>>>>>>> <details><summary>item</summary>
>>>>>>>
>>>>>>> `string | required (minimum 1 within array items)`
>>>>>>>
>>>>>>> The text which appears for this bullet point.
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <br>Media elements:
>>>>> <details><summary>media_image</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> The 'alt' text for the image which appears if the image fails to load, and is used by users of assistive technology.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>path</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> The filename (including file type extension) of the image to be rendered. The image should be placed in the folder `scenario/img/`. If placed in a sub-directory within this folder, include this: e.g. `my-sub-directory/my-image.jpg`.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>caption</summary>
>>>>>>
>>>>>> `object | optional`
>>>>>>
>>>>>> Defines a caption to appear below the image. If not defined, no caption will appear.
>>>>>>>
>>>>>>> <details><summary>text</summary>
>>>>>>>
>>>>>>> `string | required`
>>>>>>>
>>>>>>> Rendered as centered paragraph text below the image. Formatted as a link if the caption->link property is defined.
>>>>>>> </details>
>>>>>>>
>>>>>>> <details><summary>link</summary>
>>>>>>>
>>>>>>> `string | required`
>>>>>>>
>>>>>>> A resolvable URL (absolute or relative) which will be opened in a new tab when the caption text is clicked. If not defined the caption text is not clickable.
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <br>Layout elements:
>>>>> <details><summary>layout_spacer</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>size</summary>
>>>>>>
>>>>>> `integer | required`
>>>>>>
>>>>>> The size of the spacer element as vh units (percentage of the height of the users window).
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>layout_columns</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>columns</summary>
>>>>>>
>>>>>> `array | required`
>>>>>>
>>>>>> Contains the column objects which are to appear side-by-side in the content area.
>>>>>>>
>>>>>>> <details><summary>column</summary>
>>>>>>>
>>>>>>> `object | required (minimum 2)`
>>>>>>>
>>>>>>> Defined like a regular content element (e.g. text_paragraph) but with the additional optional property of `colWidth`.
>>>>>>>>
>>>>>>>> <details><summary>colWidth</summary>
>>>>>>>>
>>>>>>>> `integer | optional`
>>>>>>>>
>>>>>>>> Defines the proportion of the width of the content area that this column should take up as a division of 12. If not defined then the columns will automatically set their width.
>>>>>>>>
>>>>>>>> E.g.:
>>>>>>>> - Two columns both with `colWidth: 6` will take up half the width each.
>>>>>>>> - Three columns; one with `colWidth: 6` will take up half the width; the other two with `colWidth: undefined` will take up the remaining half between them each automatically according to content.
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <br>Input/interactive elements:
>>>>> <details><summary>input_textarea</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as regular paragraph text above the input textarea.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>keywords</summary>
>>>>>>
>>>>>> `array | optional`
>>>>>>
>>>>>> Contains the keyword objects which trigger a response to the users entry. If not defined the user entry will never generate a response.
>>>>>>>
>>>>>>> <details><summary>keyword</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines a group of trigger words which each generate the same response.
>>>>>>>>
>>>>>>>> <details><summary>id</summary>
>>>>>>>>
>>>>>>>> `string | required | unique (amongst keyword objects in keyword array) | no spaces`
>>>>>>>>
>>>>>>>> Identifies the keyword object. Used for conditional tests.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>title</summary>
>>>>>>>>
>>>>>>>> `string | required`
>>>>>>>>
>>>>>>>> Title for the concept identified by this keyword concept. Used by feedback mechanisms (e.g. to make suggestions to the user about keywords they missed).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>triggers</summary>
>>>>>>>>
>>>>>>>> `array | optional`
>>>>>>>>
>>>>>>>> Contains the trigger word strings. If any one of these is triggered the keyword object response will be shown.
>>>>>>>>>
>>>>>>>>> <details><summary>trigger</summary>
>>>>>>>>>
>>>>>>>>> `string | required (minimum 1) | lowercase`
>>>>>>>>>
>>>>>>>>> The string to search within the users entry for.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>response</summary>
>>>>>>>>
>>>>>>>> `string | optional`
>>>>>>>>
>>>>>>>> All responses, for keywords where one or more trigger word have been matched, are shown to the user after they click submit for the input_textarea. If a keyword object does not have a response defined, matching it will not generate a response.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>recommended</summary>
>>>>>>>>
>>>>>>>> `boolean | optional (default: true)`
>>>>>>>>
>>>>>>>> Used by feedback mechanisms to suggest to user if they missed a correct concept (`recommended: true`), or incorrectly identified an inappropriate concept (`recommended: false`).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>score</summary>
>>>>>>>>
>>>>>>>> `integer | optional`
>>>>>>>>
>>>>>>>>  The score assigned for matching this keyword. Can be positive, negative or 0. If not defined the default score set in the config will be used instead.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>setState</summary>
>>>>>>>>
>>>>>>>> `array | optional`
>>>>>>>>
>>>>>>>> Contains state objects to be set if the keyword is matched. If not defined the state object is not altered by matching this keyword. A keyword setState value takes priority over a setState value for the parent input_textarea.
>>>>>>>>>
>>>>>>>>> <details><summary>state</summary>
>>>>>>>>>
>>>>>>>>> `object | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Defines the state property to update and the new value.
>>>>>>>>>>
>>>>>>>>>> <details><summary>path</summary>
>>>>>>>>>>
>>>>>>>>>> `array | required`
>>>>>>>>>>
>>>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>>>
>>>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>>>
>>>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>>>
>>>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>>>> </details>
>>>>>>>>>>>
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>>> <details><summary>value</summary>
>>>>>>>>>>
>>>>>>>>>> `string/integer/float | required`
>>>>>>>>>>
>>>>>>>>>> The value to set the target state property with.
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>setState</summary>
>>>>>>
>>>>>> `array | optional`
>>>>>>
>>>>>> Contains state objects to be set if the once the input_textarea is submitted. If not defined the state object is not altered by submitting this input_textarea. If a keyword is matched which also has a setState object for the same state property, the keyword value takes priority over the input_textarea setState value.
>>>>>>>
>>>>>>> <details><summary>state</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines the state property to update and the new value.
>>>>>>>>
>>>>>>>> <details><summary>path</summary>
>>>>>>>>
>>>>>>>> `array | required`
>>>>>>>>
>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>
>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>
>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>value</summary>
>>>>>>>>
>>>>>>>> `string/integer/float | required`
>>>>>>>>
>>>>>>>> The value to set the target state property with.
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>input_checkbox</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as regular paragraph text above the checkboxes.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>checkboxes</summary>
>>>>>>
>>>>>> `array | required`
>>>>>>
>>>>>> Contains the checkbox objects for the user to choose from.
>>>>>>>
>>>>>>> <details><summary>checkbox</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines a checkbox the user can select.
>>>>>>>>
>>>>>>>> <details><summary>id</summary>
>>>>>>>>
>>>>>>>> `string | required | unique (amongst checkbox objects in checkboxes array) | no spaces`
>>>>>>>>
>>>>>>>> Identifies the checkbox object. Used for conditional tests.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>title</summary>
>>>>>>>>
>>>>>>>> `string | required`
>>>>>>>>
>>>>>>>> Title for the checkbox. Shown by the checkbox and used by feedback mechanisms (e.g. to make suggestions to the user about checkboxes they missed).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>response</summary>
>>>>>>>>
>>>>>>>> `string | optional`
>>>>>>>>
>>>>>>>> All responses, for checkboxes which are selected, are shown to the user after they click submit for the input_checkbox. If a checkbox object does not have a response defined, selecting it will not generate a response.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>recommended</summary>
>>>>>>>>
>>>>>>>> `boolean | optional (default: true)`
>>>>>>>>
>>>>>>>> Used by feedback mechanisms to suggest to user if they missed a correct checkbox (`recommended: true`), or incorrectly selected an inappropriate checkbox (`recommended: false`).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>score</summary>
>>>>>>>>
>>>>>>>> `integer | optional`
>>>>>>>>
>>>>>>>>  The score assigned for selecting this checkbox. Can be positive, negative or 0. If not defined the default score set in the config will be used instead.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>setState</summary>
>>>>>>>>
>>>>>>>> `array | optional`
>>>>>>>>
>>>>>>>> Contains state objects to be set if the checkbox is selected. If not defined the state object is not altered by selecting this checkbox. A checkbox setState value takes priority over a setState value for the parent input_checkbox.
>>>>>>>>>
>>>>>>>>> <details><summary>state</summary>
>>>>>>>>>
>>>>>>>>> `object | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Defines the state property to update and the new value.
>>>>>>>>>>
>>>>>>>>>> <details><summary>path</summary>
>>>>>>>>>>
>>>>>>>>>> `array | required`
>>>>>>>>>>
>>>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>>>
>>>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>>>
>>>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>>>
>>>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>>>> </details>
>>>>>>>>>>>
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>>> <details><summary>value</summary>
>>>>>>>>>>
>>>>>>>>>> `string/integer/float | required`
>>>>>>>>>>
>>>>>>>>>> The value to set the target state property with.
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>setState</summary>
>>>>>>
>>>>>> `array | optional`
>>>>>>
>>>>>> Contains state objects to be set if the once the input_checkbox is submitted. If not defined the state object is not altered by submitting this input_checkbox. If a checkbox is selected which also has a setState object for the same state property, the checkbox value takes priority over the input_checkbox setState value.
>>>>>>>
>>>>>>> <details><summary>state</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines the state property to update and the new value.
>>>>>>>>
>>>>>>>> <details><summary>path</summary>
>>>>>>>>
>>>>>>>> `array | required`
>>>>>>>>
>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>
>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>
>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>value</summary>
>>>>>>>>
>>>>>>>> `string/integer/float | required`
>>>>>>>>
>>>>>>>> The value to set the target state property with.
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>>> <details><summary>input_radios</summary>
>>>>>
>>>>> *These properties in addition to those for all content objects shown above*
>>>>>>
>>>>>> <details><summary>text</summary>
>>>>>>
>>>>>> `string | required`
>>>>>>
>>>>>> Rendered as regular paragraph text above the radio buttons.
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>radios</summary>
>>>>>>
>>>>>> `array | required`
>>>>>>
>>>>>> Contains the radio objects for the user to choose from.
>>>>>>>
>>>>>>> <details><summary>radio</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines a radio button the user can select.
>>>>>>>>
>>>>>>>> <details><summary>id</summary>
>>>>>>>>
>>>>>>>> `string | required | unique (amongst radio objects in radios array) | no spaces`
>>>>>>>>
>>>>>>>> Identifies the radio object. Used for conditional tests.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>title</summary>
>>>>>>>>
>>>>>>>> `string | required`
>>>>>>>>
>>>>>>>> Title for the radio button. Shown by the radio button and used by feedback mechanisms (e.g. to make suggestions to the user about a radio button they should have selected).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>response</summary>
>>>>>>>>
>>>>>>>> `string | optional`
>>>>>>>>
>>>>>>>> The responses for the radio button which is selected is shown to the user after they click submit for the input_radios. If a radio object does not have a response defined, selecting it will not generate a response.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>recommended</summary>
>>>>>>>>
>>>>>>>> `boolean | optional (default: true)`
>>>>>>>>
>>>>>>>> Used by feedback mechanisms to suggest to user if they missed a correct radio button (`recommended: true`), or incorrectly selected an inappropriate radio button (`recommended: false`).
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>score</summary>
>>>>>>>>
>>>>>>>> `integer | optional`
>>>>>>>>
>>>>>>>>  The score assigned for selecting this radio button. Can be positive, negative or 0. If not defined the default score set in the config will be used instead.
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>setState</summary>
>>>>>>>>
>>>>>>>> `array | optional`
>>>>>>>>
>>>>>>>> Contains state objects to be set if the radio button is selected. If not defined the state object is not altered by selecting this radio button. A radio button setState value takes priority over a setState value for the parent input_radios.
>>>>>>>>>
>>>>>>>>> <details><summary>state</summary>
>>>>>>>>>
>>>>>>>>> `object | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Defines the state property to update and the new value.
>>>>>>>>>>
>>>>>>>>>> <details><summary>path</summary>
>>>>>>>>>>
>>>>>>>>>> `array | required`
>>>>>>>>>>
>>>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>>>
>>>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>>>
>>>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>>>
>>>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>>>> </details>
>>>>>>>>>>>
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>>> <details><summary>value</summary>
>>>>>>>>>>
>>>>>>>>>> `string/integer/float | required`
>>>>>>>>>>
>>>>>>>>>> The value to set the target state property with.
>>>>>>>>>> </details>
>>>>>>>>>>
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>>> <details><summary>setState</summary>
>>>>>>
>>>>>> `array | optional`
>>>>>>
>>>>>> Contains state objects to be set if the once the input_radios is submitted. If not defined the state object is not altered by submitting this input_radios. If a radio button is selected which also has a setState object for the same state property, the radio button value takes priority over the input_radios setState value.
>>>>>>>
>>>>>>> <details><summary>state</summary>
>>>>>>>
>>>>>>> `object | required (minimum 1)`
>>>>>>>
>>>>>>> Defines the state property to update and the new value.
>>>>>>>>
>>>>>>>> <details><summary>path</summary>
>>>>>>>>
>>>>>>>> `array | required`
>>>>>>>>
>>>>>>>> Contains strings which together define the property to be updated. For example, to update `state.user.grade` use `path: ["user","grade"]`.
>>>>>>>>>
>>>>>>>>> <details><summary>item</summary>
>>>>>>>>>
>>>>>>>>> `string | required (minimum 1)`
>>>>>>>>>
>>>>>>>>> Component of the path to the target state property to be updated.
>>>>>>>>> </details>
>>>>>>>>>
>>>>>>>> </details>
>>>>>>>>
>>>>>>>> <details><summary>value</summary>
>>>>>>>>
>>>>>>>> `string/integer/float | required`
>>>>>>>>
>>>>>>>> The value to set the target state property with.
>>>>>>>> </details>
>>>>>>>>
>>>>>>> </details>
>>>>>>>
>>>>>> </details>
>>>>>>
>>>>> </details>
>>>>>
>>>> </details>
>>>>
>>>> <details><summary>options</summary>
>>>>
>>>> `array | optional`
>>>>
>>>> Contains the option objects which appear at the bottom of the main content panel. If not defined the options area for the node will be blank.
>>>> </details>
>>>>
>>>> <details><summary>excludeFromNotes</summary>
>>>>
>>>> `boolean | optional (default: false)`
>>>>
>>>> If `true` will prevent casenote entries being generated for the node regardless of the excludeFromNotes value set for the contents/options of the node.
>>>> </details>
>>>>
>>>> <details><summary>excludeFromLog</summary>
>>>>
>>>> `boolean | optional (default: false)`
>>>>
>>>> If `true` will prevent scenario log entries being generated for the node regardless of the excludeFromLog value set for the contents/options of the node.
>>>> </details>
>>>>
>>> </details>
>>>
>> </details>
>>
> </details>
>