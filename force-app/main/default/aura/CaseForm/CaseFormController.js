({
	doInit : function(component, event, helper) {
		helper.helperOriginPicklist(component, event);
        helper.helperPriorityPicklist(component, event);
        var availableActions = component.get("v.availableActions");
        for (var i = 0; i < availableActions.length; i++) {
            console.log('availableActions[i] ',availableActions[i]);
            if (availableActions[i] == "PAUSE") {
                component.set("v.canPause", true);
            } else if (availableActions[i] == "BACK") {
                component.set("v.canBack", true);
            } else if (availableActions[i] == "NEXT") {
                component.set("v.canNext", true);
            } else if (availableActions[i] == "FINISH") {
                component.set("v.canFinish", true);
            }
        }

        component.set('v.caseSubject', 'Hallo');
        
	},
    
    handleChangeSubject : function(component, event, helper) {
        component.set("v.caseSubject", component.get("v.cs.Subject"));
    },
    
    handleChangeDescription : function(component, event, helper) {
        component.set("v.caseDescription", component.get("v.cs.Description"));
    },
    
    handleOriginChange : function(component, event, helper) {
        component.set("v.caseOrigin", component.get("v.cs.Origin"));
    },
    
    handlePriorityChange : function(component, event, helper) {
        component.set("v.casePriority", component.get("v.cs.Priority"));
    },
    
    onButtonPressed: function(component, event, helper) {
        let isValid = true;
        let validForm = true;
        var actionClicked = event.getSource().getLocalId();
        var navigate = component.get("v.navigateFlow");
        
        if (actionClicked === "NEXT") {
            validForm = component.find('caseform').reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && inputCmp.get('v.validity').valid;
            }, true);
            if(component.get("v.selectedLookupRecord").Name === undefined) {
                let updateEvent = $A.get("e.c:InvalidLookupEvent");
                updateEvent.setParams({ "invalidLookup": true });
                updateEvent.setParams({ "objectType": 'Contact' });
                updateEvent.fire();
                validForm = false;
            }
            if(validForm) {
                navigate(actionClicked);
            }
        } else {
            navigate(actionClicked);
        }
    }
})