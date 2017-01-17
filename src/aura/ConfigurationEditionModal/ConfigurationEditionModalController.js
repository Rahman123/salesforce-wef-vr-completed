({
    doInit : function(component, event, helper) {
        if (component.get("v.isCreateMode")) {
            component.set("v.formValidation", [null, null]);
            helper.loadAllBriefs(component);
        }
        else
            component.set("v.formValidation", [null]);
	},
    
	updateFormValidity : function(component, event, helper) {
		var formValidation = component.get("v.formValidation");
        var isFormValid = null;
        for (var i=0; isFormValid == null && i<formValidation.length; i++) {
            if (formValidation[i] == null || !formValidation[i].valid)
				isFormValid = false;                
        }
        if (isFormValid == null)
            isFormValid = true;
        component.set("v.isFormValid", isFormValid);
	},
    
    onSave : function(component, event, helper) {
        var event = component.getEvent("modalClose");
        event.setParams({
            "modalId": component.get('v.modalId'),
            "action": "save",
            "data": component.get('v.configuration')
        });
        event.fire();
    },
    
    onCancel : function(component, event, helper) {
        var event = component.getEvent("modalClose");
        event.setParams({
            "modalId": component.get('v.modalId'),
            "action": "cancel"
        });
        event.fire();
    }
})