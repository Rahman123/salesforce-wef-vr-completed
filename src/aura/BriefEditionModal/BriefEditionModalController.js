({
	doInit : function(component, event, helper) {
		// Init picklists
        helper.initSelect(component, "client", "c.getClients");
        helper.initSelect(component, "country", "c.getCountries");
        helper.initSelect(component, "climate", "c.getClimates");
        // Init form validation
        var formValidation = [];
        for (var i=0; i<9; i++)
            formValidation.push(null);
        component.set("v.formValidation", formValidation);
	},
    
    updateFormValidity : function(component, event) {
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
            "data": component.get('v.brief')
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