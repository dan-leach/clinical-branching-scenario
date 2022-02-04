
myApp.component('media_image', {
    props: ['content'],
    template: `
        <div class="contentCenter">
            <img class="content-img" :src="'scenario/img/' + content.path" :alt="content.text">
            <div v-if="content.caption">
                <a v-if="content.caption.link" :href="content.caption.link" target="_blank" rel="noopener noreferrer" class="small"><figcaption>{{content.caption.text}}</figcaption></a>
                <figcaption v-else>{{content.caption.text}}</figcaption>
            </div>
        </div>
    `
})
