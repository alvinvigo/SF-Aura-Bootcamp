public class getFilter {
    public static final String param_filter = 'Filter';
    public static final String param_table = 'Table';
    public static final String param_picklist = 'picklist';
    
    public static void filter() {
        List<filterWrapper> lst_filter = new List<filterWrapper>();
        List<String> lst_pick_value = new List<String>();
        
        Map<String, List<String>> map_val = new Map<String, List<String>>();
        
        List<Report_Setting__c> lst_setting = [SELECT Id, Object_API_Name__c, Name, Field_API_Name__c, Sequences_Display__c, Display_For__c FROM Report_Setting__c WHERE Display_For__c = :param_filter AND Object_API_Name__c = 'Opportunity' ORDER BY Sequences_Display__c ASC];
        
        Map<String,Schema.SObjectField> map_schema = Schema.getGlobalDescribe().get('Opportunity').getDescribe().fields.getMap();
        for(Report_Setting__c rs : lst_setting) {
            Schema.DescribeFieldResult schema_field = map_schema.get(rs.Field_API_Name__c).getDescribe();
            filterWrapper temp_filter = new filterWrapper();
            String temp_field_type = String.valueOf(schema_field.getType()).toLowerCase();
            temp_filter.field_type = temp_field_type;
            temp_filter.field_label = schema_field.getLabel();
            temp_filter.field_api = schema_field.getName();
            if(temp_field_type.contains(param_picklist)) {
                List<Schema.PicklistEntry> lst_pe = schema_field.getPicklistValues();
                for(Schema.PicklistEntry pe : lst_pe) {
                    lst_pick_value.add(pe.getValue());
                }
                temp_filter.picklist_value = lst_pick_value;
            }
            lst_filter.add(temp_filter);
        }
        
        system.debug('lst_filter'+lst_filter);
        
    }
    
    public class filterWrapper {
        public String field_type;
        public String field_label;
        public String field_api;
        public List<String> picklist_value;
    }
}