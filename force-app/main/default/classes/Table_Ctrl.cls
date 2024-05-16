public without sharing class Table_Ctrl {
    public List<Account> lst_acc {get;set;}
    public List<wrapperAccount> lst_wrp_account {get;set;}
    
    public String accountName {get;set;}
    
	public Table_Ctrl() {
        queryAccount();
    }
    
    public void queryAccount() {
        lst_wrp_account = new List<wrapperAccount>();
        
    	lst_acc = [SELECT Id, Name, Type, Phone, External_Id__c FROM Account WHERE External_Id__c != null];
        for(Account ac : lst_acc) {
            wrapperaccount tmp_ac = new wrapperaccount(String.valueOf(ac.Id), ac.Name, ac.Type, ac.Phone, ac.External_Id__c);
            lst_wrp_account.add(tmp_ac);
        }
        system.debug('lst_wrp_account = '+lst_wrp_account);
    }
    
    public PageReference handleSave() {
        PageReference pageRef = new PageReference('/');
        pageRef.setRedirect(true);
        return pageRef;
    }
    
    public class wrapperAccount {
        public String account_id {get;set;}
        public String nama {get;set;}
        public String tipe {get;set;}
        public String no_telp {get;set;}
        public String ext_id {get;set;}
        
        public wrapperAccount(String account_id, String nama, String tipe, String no_telp, String ext_id){
            this.account_id = account_id;
            this.nama = nama;
            this.tipe = tipe;
            this.no_telp = no_telp;
            this.ext_id = ext_id;
        }
    }
}