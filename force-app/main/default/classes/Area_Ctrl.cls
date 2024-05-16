public class Area_Ctrl {
	public List<Account> lst_area {get;set;}
    public List<WS_Response_PKP> lst_res_pkp {get;set;}
    
    public Area_Ctrl() {
        String external_id = ApexPages.currentPage().getParameters().get('extid');
        
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        
        String json_body = '[{'+
            '"customer_id" : "'+external_id+'"'+
            '}]';
        
        req.setHeader(Label.Header_Key_UT_PKP, Label.Header_Key_Value_UT_PKP);
        req.setEndpoint(Label.Endpoint_DEV_UT_PKP);
        req.setMethod('POST');
        req.setTimeout(120000);
        req.setBody(json_body);
        
        try {
            res = http.send(req);
            if(res != null) {
                if(String.valueOf(res.getStatusCode()).startsWith('2')) {
                    if(res.getBody() != '""' && res.getBody() != null && String.isNotBlank(res.getBody())) {
                        lst_res_pkp = WS_Response_PKP.parse(res.getBody());
                    }
                    else ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Area Tidak Ditemukan'));
                }
            }
            if(res == null) ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Response SAP Null'));
        }
        catch(Exception ex) {
            system.debug('ex message = '+ex.getMessage());
            system.debug('ex line = '+ex.getLineNumber());
        }
    }
}