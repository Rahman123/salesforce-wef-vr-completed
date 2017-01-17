@RestResource(urlMapping='/ObjectInstance/*')
global class ObjectInstanceRestResource {
	
    @HttpPost
    global static Object_Instance__c upsertSingle(Object_Instance__c instance) {
        upsert instance;
        return instance;
    }
}