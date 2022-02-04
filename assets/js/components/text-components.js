
myApp.component('text_paragraph', {
    props: ['content'],
    template: `
        <p>
            <strong v-if="content.bold">
                {{content.text}}
            </strong>
            <span v-else>
                {{content.text}}
            </span>
        </p>
    `
})

myApp.component('text_emphasis', {
    props: ['content'],
    template: `
        <h5 class="contentCenter">
            <i>
                {{content.text}}
            </i>
        </h5>
    `
})

myApp.component('text_heading', {
    props: ['content'],
    template: `
        <span :class="{ contentCenter: content.center }">
            <h3 v-if="content.level == 1">{{content.text}}</h3>
            <h4 v-if="content.level == 2">{{content.text}}</h4>
            <h5 v-if="content.level == 3">{{content.text}}</h5>
        </span>
    `
})

myApp.component('text_link', {
    props: ['content'],
    template: `
        <p><a :href="content.link" target="_blank" rel="noopener noreferrer">{{content.text}}</a></p>
    `
})

myApp.component('text_bullets', {
    props: ['content'],
    template: `
        <div>
            <span v-if="content.text">{{content.text}}</span>
            <ul>
                <li v-for="item in content.items">{{item}}</li>
            </ul>
        </div>
    `
})

myApp.component('text_numbers', {
    props: ['content'],
    template: `
        <div>
            <span v-if="content.text">{{content.text}}</span>
            <ol>
                <li v-for="item in content.items">{{item}}</li>
            </ol>
        </div>
    `
})
