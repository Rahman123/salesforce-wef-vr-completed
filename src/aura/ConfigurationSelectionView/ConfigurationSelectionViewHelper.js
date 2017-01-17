({
    loadAllConfigurations : function(component) {
        var action = component.get("c.getAllConfigurations");
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS")
                component.set("v.configurations", response.getReturnValue());
            else
                console.log(response);
        });
        $A.enqueueAction(action);
    },
    
    selectConfiguration : function(component, configuration) {
        var event = component.getEvent("configurationSelection");
        event.setParams({"configuration": configuration});
        event.fire();
    },
    
    createConfiguration : function(component, modalData) {
        var createAction = component.get("c.createConfiguration");
        createAction.setParams({
            "newConfiguration": modalData
        });
        createAction.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var newConfiguration = response.getReturnValue();
                this.selectConfiguration(component, newConfiguration);
            }
            else {
                console.log(response);
                alert("An error occured while creating the configuration.");
            }
        });
        $A.enqueueAction(createAction);
	},
    
    deleteConfiguration : function(component, configuration) {
        // Remove row from table
        var configIndex = null;
        var configurations = component.get("v.configurations");
        for (var i=0; configIndex == null && i<configurations.length; i++) {
            if (configurations[i].Id == configuration.Id)
                configIndex = i;
        }
        configurations.splice(configIndex, 1);
        component.set("v.configurations", configurations);
        // Remove record
        var deleteAction = component.get("c.deleteConfiguration");
        deleteAction.setParams({
            "configuration": configuration
        });
        deleteAction.setCallback(this, function(response){
            if (response.getState() !== "SUCCESS") {
                console.log(response);
                alert("An error occured while deleting the configuration.");
            }
        });
        $A.enqueueAction(deleteAction);
    },
    
    getConfigurationFromId : function(component, configurationId) {
        var configuration = null;
        var configurations = component.get("v.configurations");
        for (var i=0; configuration == null && i<configurations.length; i++) {
            if (configurations[i].Id == configurationId)
                configuration = configurations[i];
        }
        return configuration;
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