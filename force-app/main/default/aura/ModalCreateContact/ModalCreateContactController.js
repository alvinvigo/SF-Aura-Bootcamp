({
	doInit : function(component, event, helper) {
		helper.helperSalutationPicklist(component, event, helper);
	},
    
    handleSave : function(component, event, helper) {
        var cont = component.get("v.cont");
        var action = component.get("c.createContact");
        action.setParams({
            cont : cont
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                let storeResponse = response.getReturnValue();
                component.set("v.cont", null);
                let updateEvent = $A.get("e.c:ContactUpdate");
                updateEvent.setParams({ contact: storeResponse });
                updateEvent.fire();
            } else if(state === "ERROR"){
                var errors = action.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert(errors[0].message);
                    }
                }
            }else if (status === "INCOMPLETE") {
                alert('No response from server or client is offline.');
            }
        });       
        $A.enqueueAction(action);
    },
    
    handleCloseModal: function(component, event, helper) {
        component.set("v.isOpen", false);
        let updateEvent = $A.get("e.c:InvalidLookupEvent");
        updateEvent.setParams({ "invalidLookup": false });
        updateEvent.fire();
    },
})