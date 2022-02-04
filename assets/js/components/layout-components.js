
myApp.component('layout_spacer', {
    props: ['content'],
    template: `
        <div :style="{ height: content.size + 'vh' }"></div>
    `
})

myApp.component('layout_columns', {
    props: ['content'],
    template: `
        <div class="row">
            <div v-for="column in content.columns" class="col" :class="['col-sm-' + column.colWidth]">
                <component_selector :content="column"></component_selector>
            </div>
        </div>
    `
})
