({
	onDrop : function(component, domEvent, helper) {
		domEvent.preventDefault();
        helper.setDropZoneHovered(component, false);
        // Retrieve & parse DOM event data
        var draggableId = domEvent.dataTransfer.getData("draggableId");
        var draggableData = JSON.parse(domEvent.dataTransfer.getData("draggableData"));
		var sourceDropZoneId = domEvent.dataTransfer.getData("sourceDropZoneId");
        // Fire Aura drop event
        var targetDropZoneId = component.get("v.id");
		var dropEvent = $A.get("e.c:DropEvent");
        dropEvent.setParams({
            "draggableId": draggableId,
            "draggableData": draggableData,
            "sourceDropZoneId": sourceDropZoneId,
            "targetDropZoneId": targetDropZoneId
        });
        dropEvent.fire();
	},
    
    handleDragEvent : function(component, event, helper) {
        var isStart = event.getParam("isStart");
        if (isStart)
            component.set("v.sourceDropZoneId", event.getParam("sourceDropZoneId"));
        if (helper.isDropAllowed(component))
	        helper.setDropZoneAvailable(component, isStart);
	},
    
    onDragOver : function(component, domEvent, helper) {
        if (helper.isDropAllowed(component))
        	domEvent.preventDefault();
	},
    
    onDragEnter : function(component, domEvent, helper) {
        if (helper.isDropAllowed(component))
            helper.setDropZoneHovered(component, true);
	},
    
    onDragLeave : function(component, domEvent, helper) {
        if (helper.isDropAllowed(component))
            helper.setDropZoneHovered(component, false);
    }
})