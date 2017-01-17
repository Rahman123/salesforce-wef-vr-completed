({
	loadAllBriefs : function(component) {
        var action = component.get("c.getAllBriefNames");
        action.setCallback(this, function(response){
            if (component.isValid() && response.getState() === "SUCCESS") {
                var select = component.find("brief");
                var body = select.get("v.body");
                response.getReturnValue().forEach(function (brief) {
                    $A.createComponent(
                        'aura:html',
                        {
                            tag: 'option',
                            HTMLAttributes: {
                                value: brief.Id,
                                text: brief.Name
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
                console.log(response);
        });
        $A.enqueueAction(action);
    }
})