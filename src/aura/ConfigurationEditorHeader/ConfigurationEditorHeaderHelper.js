({
    renameConfiguration : function(component, modalData) {
        var renameAction = component.get("c.updateConfiguration");
        renameAction.setParams({
            "configuration": modalData
        });
        renameAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS")
                component.set("v.configuration", response.getReturnValue());
            else {
                console.log(response);
                alert("An error occured while renaming the configuration.");
            }
        });
        $A.enqueueAction(renameAction);
	},
    
    deselectConfiguration : function(component) {
        var deselectEvent = component.getEvent("configurationDeselection");
        deselectEvent.fire();
    },
    
    deleteConfiguration : function(component, configuration) {
        // Remove record
        var deleteAction = component.get("c.deleteConfiguration");
        deleteAction.setParams({
            "configuration": component.get("v.configuration")
        });
        deleteAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS")
                this.deselectConfiguration(component);
            else {
                console.log(response.getError());
                alert("An error occured while deleting the configuration.");
            }
        });
        $A.enqueueAction(deleteAction);
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