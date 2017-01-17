@isTest
public class TestHelper {

    public static Brief__c getBrief() {
        return new Brief__c(Client__c='UNHCR', Delivery_Date__c=Date.today(), Budget__c=1000, Country__c='France', Town__c='Grenoble', Available_Space__c=2, Climate__c='Cold');
    }
    
    public static Object_Instance__c getObjectInstance() {
        Configuration__c conf = getConfiguration();
        insert conf;
        Object_Definition__c def = getObjectDefinition();
        insert def;
        return new Object_Instance__c(Configuration__c=conf.Id, Object_Definition__c=def.Id);
    }
        
    public static Configuration__c getConfiguration() {
        Brief__c brief = getBrief();
        insert brief;
        return new Configuration__c(Brief__c=brief.Id);
    }
    
    public static Object_Definition__c getObjectDefinition() {
        return new Object_Definition__c(Prefab_path__c='Path', Category__c='Exterior');
    }
}