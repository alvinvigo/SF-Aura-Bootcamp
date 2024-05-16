({
	helperSearch : function(component, event, getInputKeyword) {
        console.log('helperSearch');
		component.set("v.message", 'Loading...');
        $A.util.addClass(component.find("mySpinner"), "slds-show");
        var action = component.get("c.getLookupValues"); 
        var objectName = component.get("v.objectAPIName");
        action.setParams({
            'searchKeyword': getInputKeyword,
            'objectName' : objectName
        });  
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            console.log('state ', state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log('storeResponse ',storeResponse);
                // set searchResult list with return value from server.
                component.set("v.listSearchRecords", storeResponse);
                // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.message", 'No Result Found...');
                } else {
                    component.set("v.message", '');
                }
            }else {
                component.set("v.message", 'There are some erorrs..');
                let errors = response.getError();
                let message = "Unknown error";
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.error("Error: ", message);
            }
        });
        // enqueue the Action  
        //$A.enqueueAction(action);
        $A.getCallback(function() {
            $A.enqueueAction(action);
        })();
	}
})