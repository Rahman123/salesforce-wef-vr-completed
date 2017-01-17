({
	addOptions : function(component, selectComponentId, options) {
		var select = component.find(selectComponentId);
        var body = select.get('v.body');
        options.forEach(function (option) {
            $A.createComponent(
                'aura:html',
                {
                    tag: 'option',
                    HTMLAttributes: {
                        value: option,
                        text: option
                    }
                },
                function (newOption) {
                    if (component.isValid()) {
                        body.push(newOption);
                        select.set('v.body', body);
                    }
                })
        });
	},
    
    initSelect : function(component, selectComponentId, remoteMethodName) {
        var action = component.get(remoteMethodName);
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var values = response.getReturnValue();
                this.addOptions(component, selectComponentId, values);
            }
            else
                console.log(response);
        });
        $A.enqueueAction(action);
    }
})