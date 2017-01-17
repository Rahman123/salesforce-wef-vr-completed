({
	doInit : function(component, event, helper) {
        helper.loadObjectCategories(component);
	},
    
    onObjectDefinitionsChange : function(component, event, helper) {
        var allDefinitions = component.get("v.objectDefinitions");
        component.set("v.filteredObjectDefinitions", allDefinitions);
    },
    
    onChangeCategoryFilter : function(component, event, helper) {
        helper.refreshFilteredObjectDefinitions(component);
    }
})