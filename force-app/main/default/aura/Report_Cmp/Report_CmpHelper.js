({
	helperFilter : function(component, event, helper) {
		var getField = component.get('c.getField');
        getField.setParams({
            "param_object" : "Opportunity"
        });
        getField.setCallback(this, function(res_field) {
            var state_field = res_field.getState();
            if(state_field === "SUCCESS") {
                var return_field = res_field.getReturnValue();
                console.log("return_field");
                console.log(return_field);
                if(return_field.length > 0) {
                    var array_temp_obj = [];
                    for(var i=0; i<return_field.length; i++) {
                        var temp_obj = {
                            'field_label' : return_field[i].field_label,
                            'field_api' : return_field[i].field_label
                        };
                        array_temp_obj.push(temp_obj);
                        console.log("value after iteration"+i+JSON.stringify(array_temp_obj));
                    }
                    console.log("array_temp_obj");
                    console.log(array_temp_obj);
                    var getFieldValue = component.get("c.getFieldValue");
                    getFieldValue.setParams({
                        'param_field' : array_temp_obj
                    });
                    getFieldValue.setCallback(this, function(res_field_val) {
                        var state_field_val = res_field_val.getState();
                        if(state_field_val === "SUCCESS") {
                            var return_field_val = res_field_val.getReturnValue();
                        } else if(state_field_val === "ERROR") {
                            var errors = res_field_val.getError();
                            if (errors) {
                                if (errors[0] && errors[0].message) {
                                    alert("Error : "+errors[0].message);
                                }
                            } else {
                                alert("Unknown error");
                            }
                        }
                    });
                    $A.enqueueAction(getFieldValue);
                }
            } else if(state_field === "ERROR") {
                var errors = res_field.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error : "+errors[0].message);
                    }
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(getField);
	}
})