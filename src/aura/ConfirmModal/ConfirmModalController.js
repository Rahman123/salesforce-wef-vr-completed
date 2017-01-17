({
	onConfirm : function(component, event, helper) {
        var event = component.getEvent("modalClose");
        event.setParams({
            "modalId": component.get('v.modalId'),
            "action": "confirm"
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