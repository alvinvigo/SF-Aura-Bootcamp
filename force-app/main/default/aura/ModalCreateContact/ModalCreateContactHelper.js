({
	helperSalutationPicklist : function(component, event, helper) {
		var action = component.get("c.getPicklistSalutation");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var salutationMap = [];
                for(var key in result){
                    salutationMap.push({key: key, value: result[key]});
                }
                component.set("v.salutationMap", salutationMap);
            }
        });
        $A.enqueueAction(action);
	}
})