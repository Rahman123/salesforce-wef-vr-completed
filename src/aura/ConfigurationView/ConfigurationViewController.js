({
	doInit : function(component, event, helper) {
        var configuration = component.get("v.configuration");
        component.set("v.attributesLoaded", {'brief': false, 'objectInstances': false, 'objectDefinitions': false});
        // Load briefs
        helper.loadAllBriefNames(component);
        helper.loadCurrentBrief(component);
        // Get object instances
        var oiAction = component.get("c.getObjectInstancesFromConfiguration");
        oiAction.setParams({
            "configurationId": configuration.Id
        });
        oiAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.objectInstances", response.getReturnValue());
                helper.setAttributeLoaded(component, 'objectInstances');
            }
            else
                console.error(response);
        });
        $A.enqueueAction(oiAction);
        // Get object definitions
        var odAction = component.get("c.getAllObjectDefinitions");
        odAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.objectDefinitions", response.getReturnValue());
                helper.injectObjectDefinitions(component);
                helper.setAttributeLoaded(component, 'objectDefinitions');
            }
            else
                console.error(response);
        });
        $A.enqueueAction(odAction);
    },

    onChangeBrief : function(component, event, helper) {
        var configuration = component.get("v.configuration");
        // Push update to server
        var action = component.get("c.updateConfiguration");
        action.setParams({
            "configuration": configuration
        });
        action.setCallback(this, function(response){
            if (response.getState() !== "SUCCESS")
                console.error(response);
        });
        $A.enqueueAction(action);
        // Load brief details
        helper.loadCurrentBrief(component);
    },
    
    handleDropEvent : function(component, event, helper) {
        var draggableData = event.getParam("draggableData");
        var sourceDropZoneId = event.getParam("sourceDropZoneId");
        var targetDropZoneId = event.getParam("targetDropZoneId");
        
        // From instances to definitions
        if (sourceDropZoneId === "dzInstances" && targetDropZoneId === "dzDefinitions") {
            helper.deleteObjectInstance(component, draggableData);
        }
        // From definitions to instances
        else if (sourceDropZoneId === "dzDefinitions" && targetDropZoneId === "dzInstances") {
            helper.createObjectInstance(component, draggableData);
        }
	}
})