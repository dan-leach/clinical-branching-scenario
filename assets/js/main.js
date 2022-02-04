"use strict";

const app = myApp.mount('#app')

app.node = app.config.development.startNode //set the current node to the requested starting node
app.nodes[app.node].visitCount++ //arrive event does not run for start node, so increment manually
app.fn.nodes.updateView() //runs after app created, to ensure appropriate check of conditions and setting seen properties for node 0
app.transitionActive = false //trigger the fadein