({
	doInit : function(component, event, helper) {
		var definition = component.get("v.objectDefinition");
        var url = "https://raw.githubusercontent.com/pozil/salesforce-wef-vr/master/model-screenshots/"
        	+ definition.Name.replace(/ /g, "%20")
        	+ ".png";
		component.set("v.url", url);
	}
})