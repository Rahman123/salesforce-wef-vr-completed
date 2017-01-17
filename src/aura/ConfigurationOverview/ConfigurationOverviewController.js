({
	onResourcesUpdated : function(component, event, helper) {
		var resources = component.get("v.resources");
        // Set style for insufficient resource
        helper.setInsufficientResource(component, "budget", resources.budget < 0);
        helper.setInsufficientResource(component, "space", resources.space < 0);
        helper.setInsufficientResource(component, "power", resources.power < 0);
        helper.setInsufficientResource(component, "water", resources.water < 0);
        // Set formatted budget
        component.set("v.formattedCurrency", $A.localizationService.formatCurrency(resources.budget));
	}
})