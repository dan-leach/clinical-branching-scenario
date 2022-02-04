// Define a new component called emphasis-text

myApp.component('component_selector', {
    props: ['content'],
    template: `
        <div>

            <text_paragraph :content="content" v-if="content.type == 'text_paragraph'"></text_paragraph>
            <text_emphasis :content="content" v-if="content.type == 'text_emphasis'"></text_emphasis>
            <text_heading :content="content" v-if="content.type == 'text_heading'"></text_heading>
            <text_link :content="content" v-if="content.type == 'text_link'"></text_link>
            <text_bullets :content="content" v-if="content.type == 'text_bullets'"></text_bullets>
            <text_numbers :content="content" v-if="content.type == 'text_numbers'"></text_numbers>

            <layout_spacer :content="content" v-if="content.type == 'layout_spacer'"></layout_spacer>
            <layout_columns :content="content" v-if="content.type == 'layout_columns'"></layout_columns>

            <media_image :content="content" v-if="content.type == 'media_image'"></media_image>

            <input_textarea :content="content" v-if="content.type == 'input_textarea'"></input_textarea>
            <input_checkboxes :content="content" v-if="content.type == 'input_checkboxes'"></input_checkboxes>
            <input_radios :content="content" v-if="content.type == 'input_radios'"></input_radios>

        </div>
    `
})
