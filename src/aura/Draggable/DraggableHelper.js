({
	fireDragEvent : function(component, isStart) {
        var dropZoneId = component.get("v.dropZoneId");
		var dragEvent = $A.get("e.c:DragEvent");
        dragEvent.setParams({"isStart": isStart, "sourceDropZoneId": dropZoneId});
        dragEvent.fire();
	}
})