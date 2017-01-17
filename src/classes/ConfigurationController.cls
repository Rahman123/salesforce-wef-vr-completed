global class ConfigurationController{
	
    @AuraEnabled
    public static Brief__c getBrief(string briefId) {        
        return [SELECT Id, Name, Client__c, Country__c, Town__c, Budget__c, Available_Space__c, Delivery_Date__c, People_Sheltered__c, Climate__c FROM Brief__c WHERE Id=:briefId];
    }
    
    @AuraEnabled
    public static List<Brief__c> getAllBriefNames() {        
        return [SELECT Id, Name FROM Brief__c ORDER BY Name ASC];
    }
    
    @AuraEnabled
    public static List<Configuration__c> getAllConfigurations() {        
        return [SELECT Id, Name, Brief__r.Name, LastModifiedDate FROM Configuration__c ORDER BY Name ASC];
    }
    
    @AuraEnabled
    public static Configuration__c createConfiguration(Configuration__c newConfiguration) {
        insert newConfiguration;
        return newConfiguration;
    }
    
    @AuraEnabled
    public static Configuration__c updateConfiguration(Configuration__c configuration) {
        update configuration;
        return configuration;
    }
    
    @AuraEnabled
    public static void deleteConfiguration(Configuration__c configuration) {
        delete configuration;
    }
    
    @AuraEnabled
    public static List<Object_Instance__c> getObjectInstancesFromConfiguration(string configurationId) {        
        return [SELECT Id, Object_Definition__r.Id, Object_Definition__r.Name, Is_Placed__c, x__c, y__c, z__c FROM Object_Instance__c WHERE Configuration__c=:configurationId];
    }
    
    @AuraEnabled
    public static List<Object_Definition__c> getAllObjectDefinitions() {        
        return [SELECT Id, Name, Category__c, Description__c, Cost__c, Power_Consumption__c, Water_Consumption__c, Carbon_Footprint__c FROM Object_Definition__c];
    }
    
    @AuraEnabled
    public static void deleteObjectInstance(Object_Instance__c objectInstance) {
        delete objectInstance;
    }
    
    @AuraEnabled
    public static Object_Instance__c createObjectInstance(string configurationId, string objectDefinitionId) {
        Object_Instance__c instance = new Object_Instance__c(Configuration__c=configurationId, Object_Definition__c=objectDefinitionId);
        insert instance;
        return [SELECT Id, Object_Definition__r.Id, Object_Definition__r.Name, Is_Placed__c, x__c, y__c, z__c FROM Object_Instance__c WHERE Object_Instance__c.Id=:instance.Id];
    }
    
    @AuraEnabled
    public static List<string> getAllObjectCategories() {
        List<string> categories = new List<string>();
        Schema.DescribeFieldResult fieldResult = Object_Definition__c.Category__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry category : ple) {
            if (category.isActive())
            	categories.add(category.getLabel());
        }
        return categories;
    }
}