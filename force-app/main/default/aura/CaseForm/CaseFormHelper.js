({
	helperOriginPicklist : function(component, event) {
        var action = component.get("c.getPicklistOrigin");
        console.log('action check');
        console.log(action);
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var originMap = [];
                for(var key in result){
                    originMap.push({key: key, value: result[key]});
                }
                component.set("v.originMap", originMap);
            }
        });
        $A.enqueueAction(action);
    },
    
    helperPriorityPicklist : function(component, event) {
        var action = component.get("c.getPicklistPriority");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                var priorityMap = [];
                for(var key in result){
                    priorityMap.push({key: key, value: result[key]});
                }
                component.set("v.priorityMap", priorityMap);
            }
        });
        $A.enqueueAction(action);
    },
})