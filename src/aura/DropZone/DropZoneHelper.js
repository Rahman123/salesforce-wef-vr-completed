({
    isDropAllowed : function(component) {
        var dropZoneId = component.get("v.id");
        var sourceDropZoneId = component.get("v.sourceDropZoneId");
        return sourceDropZoneId !== dropZoneId;
    },
    
    setDropZoneAvailable : function(component, isAvailable) {
		var dropZone = component.find("dropZone");
        if (isAvailable) {
            $A.util.removeClass(dropZone, "dz-idle");
            $A.util.addClass(dropZone, "dz-available");
        }
        else {
            $A.util.removeClass(dropZone, "dz-available");
            $A.util.addClass(dropZone, "dz-idle");
        }
	},
    
    setDropZoneHovered : function(component, isHovered) {
		var dropZone = component.find("dropZone");
        if (isHovered) {
            $A.util.removeClass(dropZone, "dz-available");
            $A.util.addClass(dropZone, "dz-hovered");
        }
        else {
            $A.util.removeClass(dropZone, "dz-hovered");
            $A.util.addClass(dropZone, "dz-available");
        }
	}
})