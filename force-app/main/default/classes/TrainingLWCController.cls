/**
 * @description       : Controller class for Training Bootcamp SFDC CRM - MII
 * @author            : RKA
 * @group             : -
 * @last modified on  : 05-07-2024
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/

public class TrainingLWCController {
    //get data lead
    @AuraEnabled(cacheable=true)
    public static List<Lead> getLeads(){
        List<Lead> leadDatas = new List<Lead>();
        try {
            leadDatas = [SELECT Id, FirstName, LastName, Company, Phone, MobilePhone, Status, Email, LeadSource, 
                        Street, City, State, PostalCode, Country, Address
                        FROM Lead 
                        ORDER BY Createddate DESC 
                        LIMIT 5];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return leadDatas;
    }
    //upsert lead data
    @AuraEnabled
    public static string processLead(String jsonData){
        String message = '';

        Map<String, String> mapJsonData = new Map<String, String>();
        try {
            leadWrapper leadData = (leadWrapper) JSON.deserialize(jsonData, leadWrapper.class);
            message = 'success';
        } catch (Exception e) {
            message = 'error';
        }
        return message;
    }

    public class leadWrapper {
        @AuraEnabled
        public String leadId;
        @AuraEnabled
        public String fName;
        @AuraEnabled
        public String lName;
        @AuraEnabled
        public String company;
        @AuraEnabled
        public String phone;
        @AuraEnabled
        public String mobile;
        @AuraEnabled
        public String status;
        @AuraEnabled
        public String email;
        @AuraEnabled
        public String source;
        @AuraEnabled
        public String street;
        @AuraEnabled
        public String city;
        @AuraEnabled
        public String state;
        @AuraEnabled
        public String postalCode;
        @AuraEnabled
        public String country;
    }
}