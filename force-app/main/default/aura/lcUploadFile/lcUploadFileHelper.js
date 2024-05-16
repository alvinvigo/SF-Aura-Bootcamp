({
	uploadFileHelper : function(component, event, helper) {
        let isError = false;
        let message = '';
        var uploadedFiles = event.getParam("files");
        //var conversationKit = component.find("conversationKit");
        var recordId = component.get("v.recordId");
        
		var action = component.get("c.uploadFile");
        action.setParams({
            documentId: uploadedFiles[0].documentId,
            contentVersionId: uploadedFiles[0].contentVersionId,
            fileName: uploadedFiles[0].name
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                /*
                //send downloadlink
                conversationKit.sendMessage({
                    recordId: recordId,
                    message: {
                        text: response.getReturnValue()
                    }
                })
                .then(function(result){
                    if (result) {
                        console.log("Successfully sent message");
                    } else {
                        console.log("Failed to send message");
                    }
                });
                */
                
                this.showMessageHelper(component, isError, message);
            } else {
                let errors = response.getError();
                isError = true;
                message = errors[0].message;
                this.showMessageHelper(component, isError, message);
            }
        });
        $A.enqueueAction(action);
	},
    
    showMessageHelper : function(component, isError, message) {
        let title = isError == false ? "Success!!" : "Error!!";
        let variant = isError == false ? "success" : "error";
        let mode = isError == false ? "dismissable" : "sticky";
        component.find('notifLib').showToast({
            "title": title,
            "message": message,
            "variant": variant,
            "mode": mode
        });
        
		//closed modal popup
		component.set("v.showModalPopup", false);
		component.set("v.showSpinner", false);        
        $A.get('e.force:refreshView').fire();
        $A.get("e.force:closeQuickAction").fire();
    }
})