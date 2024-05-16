public class UploadFileController {
	@auraEnabled
    public static String uploadFile(String documentId, String contentVersionId, String fileName){
        ContentDocument cd = new ContentDocument();
        cd.Id = documentId;
        cd.Title = '[MYFILE] - '+fileName.substringBeforeLast('.');
        update cd;
        
        ContentDistribution cdist = new ContentDistribution();
        cdist.Name = cd.Title;
        cdist.ContentVersionId = contentVersionId;
        cdist.PreferencesAllowViewInBrowser= true;
        cdist.PreferencesLinkLatestVersion=true;
        cdist.PreferencesNotifyOnVisit=false;
        cdist.PreferencesPasswordRequired=false;
        cdist.PreferencesAllowOriginalDownload= true;
        insert cdist;
        
        ContentDistribution cdData = [SELECT Id, ContentVersionId, ContentVersion.ContentDocumentId, ContentVersion.PathOnClient, ContentVersion.FileType, ContentVersion.FileExtension, 
                                      ContentVersion.ContentBodyId, ContentVersion.Title, DistributionPublicURL 
                                      FROM ContentDistribution WHERE Id = :cdist.Id LIMIT 1];
        
        Account acc = [SELECT Id, Testing_URL__c FROM Account WHERE Id = '0015j00001BB43dAAD'];
        acc.Testing_URL__c = cdData.DistributionPublicURL;
        update acc;
        
        return [SELECT ContentDownloadUrl FROM ContentDistribution WHERE Id =:cdist.Id LIMIT 1].ContentDownloadUrl;
    }
}