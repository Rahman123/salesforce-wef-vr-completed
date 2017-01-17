({
    onRename : function(component, event, helper) {
        helper.displayModal(component, "c:ConfigurationEditionModal", {
            "modalId": "configRenameModal",
            "title": "Rename Configuration",
            "isCreateMode": false,
            "configuration": component.get("v.configuration")
        });
    },
    
    onDelete : function(component, event, helper) {
        helper.displayModal(component, "c:ConfirmModal", {
            "modalId": "configDeleteModal",
            "title": "Delete Configuration",
            "message": "Please confirm the deletion of configuration: <b>"+ component.get("v.configuration").Name +"</b>"
        });
    },
    
    onDeselectConfiguration : function(component, event, helper) {
        helper.deselectConfiguration(component);
    },
    
	handleModalClose : function(component, event, helper) {
        component.set("v.modal", null);
        var modalId = event.getParam("modalId");
        switch (modalId) {
            case "configRenameModal":
                var modalAction = event.getParam("action");
                if (modalAction == "save") {
                    var modalData = event.getParam("data");
                    helper.renameConfiguration(component, modalData);
                }
                break;
            case "configDeleteModal":
                var modalAction = event.getParam("action");
                if (modalAction == "confirm") {
                    var configuration = component.get("v.configurationToDelete");
                    helper.deleteConfiguration(component, configuration);
                }
                break;
        }
        
    },
})