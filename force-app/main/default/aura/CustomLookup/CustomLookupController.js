({
    // This function call when the end User Select any record from the result list.
    handleComponentEvent: function(component, event, helper) {
        console.log('handleComponentEvent');
        // get the selected Contact record from the COMPONETN event
        var getSelectedContact = event.getParam("recordByEvent");
        component.set("v.selectedRecord", getSelectedContact);
        
        let target = component.find("lookup-border");
        $A.util.removeClass(target, "slds-has-error");
        component.set("v.invalid", false);
        
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, "slds-show");
        $A.util.removeClass(forclose, "slds-hide");
        
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, "slds-is-close");
        $A.util.removeClass(forclose, "slds-is-open");
        
        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, "slds-hide");
        $A.util.removeClass(lookUpTarget, "slds-show");
    },
    
    handleUpdateContact: function(component, event, helper) {
        console.log('handleUpdateContact');
        let updatedContact = JSON.parse(
            JSON.stringify(event.getParam("contact"))
        );
        updatedContact.Name = updatedContact.FirstName+' '+updatedContact.LastName;
        console.log(updatedContact);
        component.set("v.selectedRecord", updatedContact);
        
        let target = component.find("lookup-border");
        $A.util.removeClass(target, "slds-has-error");
        component.set("v.invalid", false);
        
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, "slds-show");
        $A.util.removeClass(forclose, "slds-hide");
        
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, "slds-is-close");
        $A.util.removeClass(forclose, "slds-is-open");
        
        var lookUpTarget = component.find("lookupField");
        $A.util.addClass(lookUpTarget, "slds-hide");
            $A.util.removeClass(lookUpTarget, "slds-show");
    },
    
    handleInvalidLookupEvent: function(component, event, helper) {
        let invalid = event.getParam("invalidLookup");
        let objectType = event.getParam("objectType");
        let objectAPIName = component.get("v.objectAPIName");
        let target = component.find("lookup-border");
        console.log(
            "called",
            objectType,
            objectAPIName,
            invalid && objectAPIName === objectType
        );
        
        if (invalid && objectAPIName === objectType) {
            component.set("v.invalid", invalid);
            
            $A.util.addClass(target, "slds-has-error");
        } else {
            $A.util.removeClass(target, "slds-has-error");
        }
        if (objectAPIName === objectType) {
        }
    },
    
    doInit : function(component, event, helper) {
        console.log(component.get("v.selectedRecord"));
        if (component.get("v.selectedRecord").Name !== undefined) {
            var forclose = component.find("lookup-pill");
            $A.util.addClass(forclose, "slds-show");
            $A.util.removeClass(forclose, "slds-hide");
            
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, "slds-is-close");
            $A.util.removeClass(forclose, "slds-is-open");
            
            var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, "slds-hide");
            $A.util.removeClass(lookUpTarget, "slds-show");
        }
	},
    
    handleOnfocus : function(component, event, helper) {
        var forOpen = component.find("searchRes");
        $A.util.addClass(forOpen, "slds-is-open");
        $A.util.removeClass(forOpen, "slds-is-close");
        // Get Default 5 Records order by createdDate DESC
        var getInputKeyword = component.get("v.searchKeyword");
        helper.helperSearch(component, event, getInputKeyword);
    },
    
    handleOnblur: function(component, event, helper) {
        component.set("v.listSearchRecords", null);
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, "slds-is-close");
        $A.util.removeClass(forclose, "slds-is-open");
    },
    
    handleKeyup : function(component, event, helper) {
        // get the search Input keyword
        var getInputKeyword = component.get("v.searchKeyword");
        // check if getInputKeyWord size id more then 0 then open the lookup result List and
        // call the helper
        // else close the lookup result List part.
        if (getInputKeyword.length > 0) {
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, "slds-is-open");
            $A.util.removeClass(forOpen, "slds-is-close");
            var timer = component.get("v.timer");
            clearTimeout(timer);
            var timer = setTimeout(function() {
                helper.helperSearch(component, event, getInputKeyword);
                clearTimeout(timer);
                component.set("v.timer", null);
            }, 500);
            component.set("v.timer", timer);
        } else {
            component.set("v.listSearchRecords", null);
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, "slds-is-close");
            $A.util.removeClass(forclose, "slds-is-open");
        }
    },
    
    // function for clear the Record Selaction
    handleClear: function(component, event, helper) {
        var pillTarget = component.find("lookup-pill");
        var lookUpTarget = component.find("lookupField");
        
        $A.util.addClass(pillTarget, "slds-hide");
        $A.util.removeClass(pillTarget, "slds-show");
        
        $A.util.addClass(lookUpTarget, "slds-show");
        $A.util.removeClass(lookUpTarget, "slds-hide");
        
        component.set("v.searchKeyword", null);
        component.set("v.listSearchRecords", null);
        component.set("v.selectedRecord", component.get("v.emptyRecord"));
    },
    
    handleCreateContact : function(component, event, helper) {
        component.set("v.isOpen", true);
    }
})