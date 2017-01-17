({
    handleConfigurationDeselection : function(component, event, helper) {
        component.set("v.configuration", null);
        component.find("configurationSelectionView").refresh();
	},
    
	handleConfigurationSelection : function(component, event, helper) {
        var configuration = event.getParam("configuration");
        component.set("v.configuration", configuration);
	}
})