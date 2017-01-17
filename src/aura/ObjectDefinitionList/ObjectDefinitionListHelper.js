({
	loadObjectCategories : function(component) {
		var action = component.get("c.getAllObjectCategories");
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var categories = response.getReturnValue();
                // Init brief select
                var select = component.find("categoryFilter");
                var body = select.get("v.body");
                categories.forEach(function (category) {
                    $A.createComponent(
                        'aura:html',
                        {
                            tag: 'option',
                            HTMLAttributes: {
                                value: category,
                                text: category
                            }
                        },
                        function (newOption) {
                            if (component.isValid()) {
                                body.push(newOption);
                                select.set("v.body", body);
                            }
                        })
                });
            }
            else
                console.error(response);
        });
        $A.enqueueAction(action);
	},
    
    refreshFilteredObjectDefinitions : function(component) {
        var categoryFilter = component.get("v.categoryFilter");
        var allDefinitions = component.get("v.objectDefinitions");
        if (categoryFilter === "")
            component.set("v.filteredObjectDefinitions", allDefinitions);
        else {
            var filteredDefinitions = [];
            allDefinitions.forEach(function(definition) {
                if (definition.Category__c == categoryFilter)
                    filteredDefinitions.push(definition);
            });
            component.set("v.filteredObjectDefinitions", filteredDefinitions);
        }
    }
})