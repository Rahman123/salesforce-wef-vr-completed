({
	doInit : function(component, event, helper) {
        helper.loadAllConfigurations(component);
    },
    
    onCreateConfiguration : function(component, event, helper) {
        helper.displayModal(component, "c:ConfigurationEditionModal", {
            "modalId": "configCreationModal",
            "title": "Create Configuration",
            "isCreateMode": true,
            "configuration": {'sobjectType':'Configuration__c', 'Name':''}
        });
    },
    
    onDeleteConfiguration : function(component, event, helper) {
        var configId = event.currentTarget.id;
        var configuration = helper.getConfigurationFromId(component, configId);
        component.set("v.configurationToDelete", configuration);
        helper.displayModal(component, "c:ConfirmModal", {
            "modalId": "configDeletionModal",
            "title": "Delete Configuration",
            "message": "Please confirm the deletion of configuration: <b>"+ configuration.Name +"</b>"
        });
    },
    
    refresh : function(component, event, helper) {
        component.set("v.configurations", []);
        helper.loadAllConfigurations(component);
    },
    
    handleModalClose : function(component, event, helper) {
        component.set("v.modal", null);
        var modalId = event.getParam("modalId");
        switch (modalId) {
            case "configCreationModal":
                var modalAction = event.getParam("action");
                if (modalAction == "save") {
                    var modalData = event.getParam("data");
                    helper.createConfiguration(component, modalData);
                }
                break;
            case "configDeletionModal":
                var modalAction = event.getParam("action");
                if (modalAction == "confirm") {
                    var configuration = component.get("v.configurationToDelete");
                    helper.deleteConfiguration(component, configuration);
                }
                break;
        }
    },

    onSelectConfig : function (component, event, helper) {
        var configId = event.srcElement.id;
        var configuration = helper.getConfigurationFromId(component, configId);
        helper.selectConfiguration(component, configuration);
    }
})