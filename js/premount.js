for (var nodeIndex in scenario.nodes){
    var node = scenario.nodes[nodeIndex]
    if (node.options){
        for (var optionIndex in node.options){
            option = node.options[optionIndex]
            if (!option.class) option.class = {'btn-primary': true} //if class not specified, set as btn-primary
            option.visible = (option.conditions) ? false : true //if the option has conditions, start as not visisble
        }
    }
}