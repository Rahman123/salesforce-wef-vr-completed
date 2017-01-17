@isTest
public class ObjectInstanceRestResourceTest {
    static testMethod void testUpsertSingle() {
        Boolean success = true;
        
        Configuration__c conf = TestHelper.getConfiguration();
        insert conf;
        Object_Definition__c def = TestHelper.getObjectDefinition();
        insert def;
        Object_Instance__c instance = new Object_Instance__c(Configuration__c=conf.Id, Object_Definition__c=def.Id);
        
        try {
            ObjectInstanceRestResource.upsertSingle(instance);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
}