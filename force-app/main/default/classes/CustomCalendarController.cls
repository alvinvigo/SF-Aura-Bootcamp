public without sharing class CustomCalendarController {
    public static List<eventWrapper> getListEvent(Id recordId, String sObjectName) {
        List<SObject> listSobject = new List<SObject>();
        List<eventWrapper> listEvent = new List<eventWrapper>();

        if (String.isNotBlank(sObjectName) && String.isNotBlank(recordId)) {
            String parentObject = recordId.getSobjectType().getDescribe().getName();
            system.debug('parentObject >> '+parentObject);

            String condition = '';
            if (parentObject != 'Lead' && parentObject != 'Contact') {
                condition = 'WhatId = \''+recordId+'\'';
            } else {
                condition = 'WhoId = \''+recordId+'\'';
            }
            system.debug('condition >> '+condition);

            listSobject = (List<SObject>) UtilSOQL.listSobject(',Owner.Name', sObjectName, '', '', '', '');
            if(listSobject.size() > 0) {
                for (SObject sobj : listSobject) {
                    String sobjId = sobj.Id;
                    String objectName = sobj.getSObjectType().getDescribe().getName();
                    if(objectName == 'Event') {
                        system.debug('owner object >> '+sobj.getSObject('Owner'));
                        eventWrapper tempEvent = new eventWrapper(
                            (String) sobj.Id,
                            (String) sobj.get('Subject'),
                            (Datetime) sobj.get('StartDateTime'),
                            (Datetime) sobj.get('EndDateTime'),
                            (String) sobj.get('Description'),
                            sobj.getSObject('Owner')
                        );
                        listEvent.add(tempEvent);
                    }
                }
            }
        }
        system.debug('listEvent >> '+listEvent);
        return listEvent;
    }

    public class eventWrapper {
        @AuraEnabled
        public String Id {get; set;}
        @AuraEnabled
        public String subject {get; set;}
        @AuraEnabled
        public Datetime startDatetime {get; set;}
        @AuraEnabled
        public Datetime endDatetime {get; set;}
        @AuraEnabled
        public String description {get; set;}
        @AuraEnabled
        public Object owner {get; set;}

        public eventWrapper(String Id, String subject, Datetime startDatetime, Datetime endDatetime, String description, Object owner) {
            this.Id = Id;
            this.subject = subject;
            this.startDatetime = startDatetime;
            this.endDatetime = endDatetime;
            this.description = description;
            this.owner = owner;
        }
    }
}