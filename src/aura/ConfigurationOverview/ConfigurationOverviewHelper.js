({
	setInsufficientResource : function(component, resourceName, isInsufficient) {
		if (isInsufficient)
        	$A.util.addClass(component.find(resourceName), "is-insufficient");
        else
            $A.util.removeClass(component.find(resourceName), "is-insufficient");
	}
})