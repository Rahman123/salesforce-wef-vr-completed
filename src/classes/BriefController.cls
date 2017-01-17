public class BriefController {
	
    @AuraEnabled
    public static List<Brief__c> getAllBriefs() {
        return [SELECT Id, Name, Client__c, Country__c, Town__c, Budget__c, Delivery_Date__c, People_Sheltered__c, Climate__c FROM Brief__c ORDER BY Name ASC];
    }
    
    @AuraEnabled
    public static List<string> getClients() {
        return getPicklistLabels(Brief__c.Client__c.getDescribe());
    }
    
    @AuraEnabled
    public static List<string> getCountries() {
        return getPicklistLabels(Brief__c.Country__c.getDescribe());
    }
    
    @AuraEnabled
    public static List<string> getClimates() {
        return getPicklistLabels(Brief__c.Climate__c.getDescribe());
    }
    
    private static List<string> getPicklistLabels(Schema.DescribeFieldResult fieldDescription) {
        List<string> labels = new List<string>();
        List<Schema.PicklistEntry> items = fieldDescription.getPicklistValues();
        for(Schema.PicklistEntry item : items) {
            if (item.isActive())
                labels.add(item.getLabel());
        }
        return labels;
    }
    
    @AuraEnabled
    public static Brief__c createBrief(Brief__c brief) {
        insert brief;
        return brief;
    }
    
    @AuraEnabled
    public static Brief__c updateBrief(Brief__c brief) {
        update brief;
        return brief;
    }
    
    @AuraEnabled
    public static void deleteBrief(Brief__c brief) {
        delete brief;
    }
}