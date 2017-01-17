({
	doInit : function(component, event, helper) {
        helper.loadAllBriefs(component);
    },
    
    onCreateBrief : function(component, event, helper) {
        helper.displayModal(component, "c:BriefEditionModal", {
            "modalId": "briefCreationModal",
            "title": "Create Brief",
            "brief": {'sobjectType':'Brief__c', 'Name':'', 'Client__c':'', 'Delivery_Date__c':'', 'Budget__c':'', 'Country__c':'', 'Town__c':'', 'Available_Space__c':''}
        });
    },
    
    onDeleteBrief : function(component, event, helper) {
        var briefId = event.currentTarget.id;
        var brief = helper.getBriefFromId(component, briefId);
        component.set("v.briefToDelete", brief);
        helper.displayModal(component, "c:ConfirmModal", {
            "modalId": "briefDeletionModal",
            "title": "Delete Brief",
            "message": "Please confirm the deletion of brief: <b>"+ brief.Name +"</b>.<br/>This will also delete ALL configurations associated to it."
        });
    },
    
    refresh : function(component, event, helper) {
        component.set("v.briefs", []);
        helper.loadAllBriefs(component);
    },
    
    handleModalClose : function(component, event, helper) {
        component.set("v.modal", null);
        var modalId = event.getParam("modalId");
        switch (modalId) {
            case "briefCreationModal":
                var modalAction = event.getParam("action");
                if (modalAction == "save") {
                    var modalData = event.getParam("data");
                    helper.createBrief(component, modalData);
                }
                break;
            case "briefDeletionModal":
                var modalAction = event.getParam("action");
                if (modalAction == "confirm") {
                    var brief = component.get("v.briefToDelete");
                    helper.deleteBrief(component, brief);
                }
                break;
        }
    },

    onSelectBrief : function (component, event, helper) {
        var briefId = event.srcElement.id;
        var brief = helper.getBriefFromId(component, briefId);
        helper.selectBrief(component, brief);
    }
})