
myApp.component('input_textarea', {
    props: ['content'],
    data() {
        return {
            userEntry: ""
        }
    },
    methods: {
        submit: function(){
            let contentIndex = app.fn.nodes.contents.findIndex(this.content.id, app.node) //get the index of the current input_textarea object in the contents array of the current node
            let contentObj = app.nodes[app.node].contents[contentIndex] //define the current input_textarea object in the contents array of the current node
            contentObj.userEntry = this.userEntry //update the userEntry value
            app.fn.nodes.contents.input_textarea.submit(contentIndex) //trigger the submit event
        }
    },
    template: `
        <div>
            <label :for="content.id"> {{content.text}}</label>
            <textarea :id=content.id v-model="userEntry" class="form-control"></textarea><br>
            <div class="full-width contentCenter">
                <button @click="submit()" class="btn m-2 btn-primary">Submit</button>
            </div>
            <br>
        </div>
    `
})


myApp.component('input_checkboxes', {
    props: ['content'],
    data() {
        return {
            checkboxes: []
        }
    },
    methods: {
        submit: function(){
            let contentIndex = app.fn.nodes.contents.findIndex(this.content.id, app.node) //get the index of the current input_checkboxes object in the contents array of the current node
            let contentObj = app.nodes[app.node].contents[contentIndex] //define the current input_checkboxes object in the contents array of the current node
            for (let checkboxIndex in this.checkboxes) { //cycle through the checkboxes in the component
                let checkbox = this.checkboxes[checkboxIndex] //get the current checkbox object in the component
                for (let objCheckboxIndex in contentObj.checkboxes) { //cycle through the checkboxes in the content object
                    let objCheckbox = contentObj.checkboxes[objCheckboxIndex] //get the current checkbox object in the content object
                    if (objCheckbox.id == checkbox.id) objCheckbox.checked = checkbox.checked //if the id matches, update the checked state to match
                }
            }
            app.fn.nodes.contents.input_checkboxes.submit(contentIndex) //trigger the submit event
        }
    },
    created() {
        for (let checkboxIndex in this.content.checkboxes) this.checkboxes.push({
            id: this.content.checkboxes[checkboxIndex].id,
            checked: false
        })
    },
    template: `
        <div>
            <label :for="content.id">{{content.text}}</label>
            <div :id="content.id">
                <div v-for="(checkbox, index) in content.checkboxes" class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="checkboxes[index].checked" :disabled="content.disabled">
                    <label class="form-check-label">{{checkbox.title}}</label>
                </div>
            </div>
            <div class="full-width contentCenter">
                <button @click="submit()" class="btn m-2 btn-primary" :disabled="content.disabled">Submit</button>
            </div>
            <br>
        </div>
    `
})


myApp.component('input_radios', {
    props: ['content'],
    data() {
        return {
            selected: ""
        }
    },
    methods: {
        submit: function(){
            console.log("selected: ", this.selected)
            let contentIndex = app.fn.nodes.contents.findIndex(this.content.id, app.node) //get the index of the current input_radios object in the contents array of the current node
            let contentObj = app.nodes[app.node].contents[contentIndex] //define the current input_radios object in the contents array of the current node
            contentObj.selected = this.selected //update the selected value of the current input_radios object
            app.fn.nodes.contents.input_radios.submit(contentIndex) //trigger the submit event
        }
    },
    template: `
        <div>
            <label :for="content.id">{{content.text}}</label>
            <div :id="content.id">
                <div v-for="radio in content.radios" class="form-check">
                    <input class="form-check-input" type="radio" name="content.id" :value="radio.id" v-model="selected" :disabled="content.disabled">
                    <label class="form-check-label">{{radio.title}}</label>
                </div>
            </div>
            <div class="full-width contentCenter">
                <button @click=submit() class="btn m-2 btn-primary" :disabled="content.disabled">Submit</button>
            </div>
            <br>
        </div>
    `
})
