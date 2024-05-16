public class CustomLookup_Ctrl {
    @AuraEnabled
    public static List<sObject> getLookupValues(String searchKeyword, String objectName) {
        system.debug('objectName = '+objectName);
        String searchKey = '%' + searchKeyword + '%';
        String query;
        if(objectName == 'Contact'){
            query =  'select id, Name,Email from '+objectName+' where Name LIKE: searchKey or Email LIKE: searchKey order by createdDate DESC limit 5';
        } else if(objectName == 'Case'){
            query =  'select id, CaseNumber, Subject from '+objectName+' where CaseNumber LIKE: searchKey or Subject LIKE: searchKey order by createdDate DESC limit 5';
        } else {
            query =  'select id, Name from '+objectName+' where Name LIKE: searchKey order by createdDate DESC limit 5';
        }
        List<sObject> listRecord = Database.query(query);
        return listRecord;
    }
}