({
    updateResources : function(component) {
        var brief = component.get("v.brief");
        var objectInstances = component.get("v.objectInstances");
        // Set base values
        var resources = {'budget': 0, 'power': 0, 'space': 0, 'water': 0, 'carbon': 0};
        resources.budget = brief.Budget__c;
        resources.space = brief.Available_Space__c;
        // Calculate resources
        objectInstances.forEach(function (objectInstance) {
            var objectDefinition = objectInstance.definition;
            resources.budget -= objectDefinition.Cost__c;
            resources.power -= objectDefinition.Power_Consumption__c;
            resources.water -= objectDefinition.Water_Consumption__c;
            resources.carbon += objectDefinition.Carbon_Footprint__c;
            // TODO: handle space
        });
        component.set("v.resources", resources);
    },
    
    setAttributeLoaded : function(component, attributeName) {
        var attributesLoaded = component.get("v.attributesLoaded");
        attributesLoaded[attributeName] = true;
        component.set("v.attributesLoaded", attributesLoaded);
        // Force resource update when everything is loaded
        if (attributesLoaded.brief && attributesLoaded.objectInstances && attributesLoaded.objectDefinitions)
 	       this.updateResources(component);
    },
    
    loadAllBriefNames : function(component) {
        var action = component.get("c.getAllBriefNames");
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var briefs = response.getReturnValue();
                component.set("v.briefs", briefs);
                // Init brief select
                var select = component.find("brief");
                var currentBriefId = select.get("v.value");
                var body = select.get("v.body");
                briefs.forEach(function (brief) {
                    $A.createComponent(
                        'aura:html',
                        {
                            tag: 'option',
                            HTMLAttributes: {
                                value: brief.Id,
                                text: brief.Name,
                                selected: (brief.Id == currentBriefId ? true : false)
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
    
    injectObjectDefinitions : function(component) {
        var helper = this;
        var instances = component.get("v.objectInstances");
        var definitions = component.get("v.objectDefinitions");        
        instances.forEach(function(instance) {
            var definition = helper.getObjectDefinitionFromId(component, instance.Object_Definition__c);
            instance.definition = definition;
        });
        component.set("v.objectInstances", instances);
    },
    
    getObjectDefinitionFromId : function(component, definitionId) {
        var definition = null;
        var definitions = component.get("v.objectDefinitions");
        for (var i=0; definition == null && i<definitions.length; i++) {
            if (definitions[i].Id == definitionId)
                definition = definitions[i];
        }
        return definition;
    },
    
    loadCurrentBrief : function(component) {
        var helper = this;
        var configuration = component.get("v.configuration");
        var action = component.get("c.getBrief");
        action.setParams({
            "briefId": configuration.Brief__c
        });
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                component.set("v.brief", response.getReturnValue());
                helper.setAttributeLoaded(component, 'brief');
                helper.updateResources(component);
            }
            else
                console.error(response);
        });
        $A.enqueueAction(action);
    },
    
    deleteObjectInstance : function(component, objectInstance) {
        var helper = this;
        var action = component.get("c.deleteObjectInstance");
        action.setParams({
            "objectInstance": objectInstance
        });
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                // Update UI
                var instances = component.get("v.objectInstances");
                var isRemoved = false;
                for (var i=0; !isRemoved && i<instances.length; i++) {
                    if (instances[i].Id == objectInstance.Id) {
                        instances.splice(i, 1);
                        component.set("v.objectInstances", instances);
                        isRemoved = true;
                    }
                }
                helper.updateResources(component);
            }
            else
                console.error(response);
        });
        $A.enqueueAction(action);
    },
    
    createObjectInstance : function(component, objectDefinition) {
        var helper = this;
        var action = component.get("c.createObjectInstance");
        action.setParams({
            "configurationId": component.get("v.configuration").Id,
            "objectDefinitionId": objectDefinition.Id
        });
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                // Update UI
                var instance = response.getReturnValue();
            	instance.definition = helper.getObjectDefinitionFromId(component, instance.Object_Definition__c);
                var instances = component.get("v.objectInstances");
                instances.push(instance);
                component.set("v.objectInstances", instances);
                helper.updateResources(component);
            }
            else
                console.error(response);
        });
        $A.enqueueAction(action);
    }
})