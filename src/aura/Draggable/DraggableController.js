({
	onDragStart : function(component, domEvent, helper) {
        // Set DOM event data
        domEvent.dataTransfer.setData("draggableId", domEvent.target.id);
        domEvent.dataTransfer.setData("draggableData", JSON.stringify(component.get("v.data")));
        domEvent.dataTransfer.setData("sourceDropZoneId", component.get("v.dropZoneId"));
        // Fire drag event
        helper.fireDragEvent(component, true);
    },
    
    onDragEnd : function(component, event, helper) {
        helper.fireDragEvent(component, false);
    },
    
    handleDropEvent : function(component, event, helper) {
        var draggableId = event.getParam("draggableId");
        if (!component.get("v.isSticky") && draggableId == component.get("v.id"))
            component.set("v.dropZoneId", event.getParam("targetDropZoneId"));
	}
})