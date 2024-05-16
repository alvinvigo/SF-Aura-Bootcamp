public class CaseForm_Ctrl {
    @AuraEnabled
    public static Map<String, String> getPicklistOrigin() {
        Map<String, String> options = new Map<String, String>();
        //get Case Origin Field Describe
        Schema.DescribeFieldResult fieldResult = Case.Origin.getDescribe();
        //get Case Origin Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Origin Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled
    public static Map<String, String> getPicklistPriority() {
        Map<String, String> options = new Map<String, String>();
        //get Case Priority Field Describe
        Schema.DescribeFieldResult fieldResult = Case.Priority.getDescribe();
        //get Case Priority Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Priority Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled
    public static Map<String, String> getPicklistSalutation() {
        Map<String, String> options = new Map<String, String>();
        //get Contact Salutation Field Describe
        Schema.DescribeFieldResult fieldResult = Contact.Salutation.getDescribe();
        //get Contact Salutation Picklist Values
        List<Schema.PicklistEntry> pList = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry p: pList) {
            //Put Salutation Picklist Value & Label in Map
            options.put(p.getValue(), p.getLabel());
        }
        return options;
    }
    
    @AuraEnabled
    public static Contact createContact(Contact cont) {
        try {
            insert cont;
        } catch(Exception e){
            //throw exception message
            throw new AuraHandledException(e.getMessage());
        }
        finally {
        }
        return cont;
    } 
}