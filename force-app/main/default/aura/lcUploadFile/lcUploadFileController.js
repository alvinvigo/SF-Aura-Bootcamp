({
    uploadFilectrl: function(component, event, helper) {
        component.set("v.showModalPopup", true);
        /*var conversationKit = cmp.find("conversationKit");
        var recordId = cmp.get("v.recordId");
        conversationKit.sendMessage({
            recordId: recordId,
            message: {
                text:"Hi, this was sent using the sendMessage API!"
            }
        })
        .then(function(result){
            if (result) {
                    console.log("Successfully sent message");
                } else {
                    console.log("Failed to send message");
                }
        });*/
    },
    
    handleUploadFinished: function (component, event, helper) {
        component.set("v.showModalPopup", false);
        helper.uploadFileHelper(component, event, helper);
    },
    
    closeModel: function(component, event, helper) {
        // Set showModalPopup attribute to false  
        component.set("v.showModalPopup", false);
    }
})