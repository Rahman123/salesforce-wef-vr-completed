({
	handleDropEvent : function(component, event, helper) {
		var draggableId = event.getParam("draggableId");
        var draggableData = event.getParam("draggableData");
        var sourceDropZoneId = event.getParam("sourceDropZoneId");
        var targetDropZoneId = event.getParam("targetDropZoneId");
        
        document.getElementById(targetDropZoneId).childNodes[0].appendChild(document.getElementById(draggableId));
        
        console.log("Drag & dropped "+ draggableId +" from "+ sourceDropZoneId +" to "+ targetDropZoneId);
	}
})