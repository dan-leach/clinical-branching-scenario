"use strict";

Vue.component('notes-points', {
    props: ['obj'],
    template: `
        <ul class="notes">
            <li>type: <span v-if="obj.value">{{typeof(obj.value)}}</span><span v-else>object</span></li>
            <li v-if="obj.purpose">{{obj.purpose}}</li>
            <li v-if="obj.optional">optional: {{obj.optional}}</li>
            <li v-else>required</li>
            <li v-if="obj.options">
                Options:
            </li>
        </ul>
    `
})

Vue.component('key-value', {
    props: ['k','value'],
    template: `
        <span><span class="key">{{k}}:</span> <span class="value" v-if="value">"{{value}}",</span><span v-else>{</span></span>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        guide: {
            scenario: {
                purpose: "defines the scenario appearance and behaviour",
                title: {
                    value: "My Title",
                    purpose: "renders at the top of the page"
                },
                subtitle: {
                    value: "My Subtitle",
                    purpose: "renders below the title",
                    optional: "if not provided no subtitle will render"
                },
                config: {
                    nodes: {
                        contents: {
                            inputTextarea: {
                                minLength: {
                                    value: 10,
                                    notes: "minLength notes"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})