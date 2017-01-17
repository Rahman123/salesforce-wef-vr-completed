@isTest
public class BriefControllerTest {
    static testMethod void getAllBriefs() {
        Boolean success = true;
        try {
            BriefController.getAllBriefs();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getClients() {
        Boolean success = true;
        try {
            BriefController.getClients();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getCoutries() {
        Boolean success = true;
        try {
            BriefController.getCountries();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void getClimates() {
        Boolean success = true;
        try {
            BriefController.getClimates();
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void createBrief() {
        Boolean success = true;
        try {
            Brief__c brief = TestHelper.getBrief();
            BriefController.createBrief(brief);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void updateBrief() {
        Boolean success = true;
        try {
            Brief__c brief = TestHelper.getBrief();
            insert brief;
            BriefController.updateBrief(brief);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
    
    static testMethod void deleteBrief() {
        Boolean success = true;
        try {
            Brief__c brief = TestHelper.getBrief();
            insert brief;
            BriefController.deleteBrief(brief);
        } catch (Exception e) {
            success = false;
        } finally {
            System.assert(success);
        }
    }
}