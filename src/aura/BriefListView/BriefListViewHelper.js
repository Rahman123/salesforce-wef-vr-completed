({
    loadAllBriefs : function(component) {
        var action = component.get("c.getAllBriefs");
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS")
                component.set("v.briefs", response.getReturnValue());
            else
                console.log(response);
        });
        $A.enqueueAction(action);
    },
    
    selectBrief : function(component, brief) {
        var event = component.getEvent("briefSelection");
        event.setParams({"brief": brief});
        event.fire();
    },
    
    createBrief : function(component, modalData) {
        var createAction = component.get("c.createBrief");
        createAction.setParams({
            "brief": modalData
        });
        createAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var briefs = component.get("v.briefs");
                briefs.push(response.getReturnValue());
                component.set("v.briefs", briefs);
            }
            else {
                console.log(response);
                alert("An error occured while creating the brief.");
            }
        });
        $A.enqueueAction(createAction);
	},
    
    deleteBrief : function(component, brief) {
        // Remove row from table
        var briefIndex = null;
        var briefs = component.get("v.briefs");
        for (var i=0; briefIndex == null && i<briefs.length; i++) {
            if (briefs[i].Id == brief.Id)
                briefIndex = i;
        }
        briefs.splice(briefIndex, 1);
        component.set("v.briefs", briefs);
        // Remove record
        var deleteAction = component.get("c.deleteBrief");
        deleteAction.setParams({
            "brief": brief
        });
        deleteAction.setCallback(this, function(response){
            if (response.getState() !== "SUCCESS") {
                console.log(response);
                alert("An error occured while deleting the brief.");
            }
        });
        $A.enqueueAction(deleteAction);
    },
    
    getBriefFromId : function(component, briefId) {
        var brief = null;
        var briefs = component.get("v.briefs");
        for (var i=0; brief == null && i<briefs.length; i++) {
            if (briefs[i].Id == briefId)
                brief = briefs[i];
        }
        return brief;
    },
    
    displayModal : function(component, modalComponentName, modalProperties) {
        $A.createComponent(
            modalComponentName,
            modalProperties,
            function(newModal, status, errorMessage) {
                if (status === "SUCCESS")
                    component.set("v.modal", newModal);
                else if (status === "INCOMPLETE")
                    console.log("No response from server or client is offline.")
                else if (status === "ERROR")
                    console.log("Error: " + errorMessage);
            }
        );
    }
})