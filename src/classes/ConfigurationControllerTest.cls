@isTest
public class ConfigurationControllerTest {
    static testMethod void getAllBriefs() {
        Boolean success = true;
        try {
            Brief__c brief = TestHelper.getBrief();
            insert brief;
            ConfigurationController.getBrief(brief.Id);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getAllBriefNames() {
        Boolean success = true;
        try {
            ConfigurationController.getAllBriefNames();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getAllConfigurations() {
        Boolean success = true;
        try {
            ConfigurationController.getAllConfigurations();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void createConfiguration() {
        Boolean success = true;
        try {
            Configuration__c configuration = TestHelper.getConfiguration();
            ConfigurationController.createConfiguration(configuration);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void updateConfiguration() {
        Boolean success = true;
        try {
            Configuration__c configuration = TestHelper.getConfiguration();
            insert configuration;
            ConfigurationController.updateConfiguration(configuration);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void deleteConfiguration() {
        Boolean success = true;
        try {
            Configuration__c configuration = TestHelper.getConfiguration();
            insert configuration;
            ConfigurationController.deleteConfiguration(configuration);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getObjectInstancesFromConfiguration() {
        Boolean success = true;
        try {
            Configuration__c configuration = TestHelper.getConfiguration();
            insert configuration;
            ConfigurationController.getObjectInstancesFromConfiguration(configuration.Id);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getAllObjectDefinitions() {
        Boolean success = true;
        try {
            ConfigurationController.getAllObjectDefinitions();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void deleteObjectInstance() {
        Boolean success = true;
        try {
            Object_Instance__c objectInstance = TestHelper.getObjectInstance();
            insert objectInstance;
            ConfigurationController.deleteObjectInstance(objectInstance);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void createObjectInstance() {
        Boolean success = true;
        try {
            Configuration__c configuration = TestHelper.getConfiguration();
            insert configuration;
            Object_Definition__c objectDefinition = TestHelper.getObjectDefinition();
            insert objectDefinition;
            ConfigurationController.createObjectInstance(configuration.Id, objectDefinition.Id);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getAllObjectCategories() {
        Boolean success = true;
        try {
            ConfigurationController.getAllObjectCategories();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
}