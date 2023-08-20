/**
 * @Author: Ganesh Shivaji Mhaske
 * @Date: 20 Aug 2023
 * @Task/User Story: Bruntwood SF Challenge Requirment 1
 * @Description: This test class contains test methods for the ContactUserController class.
 */
@isTest
public class ContactUserControllerTest {
    /**
	* This test setup method initializes the required data for testing the ContactUserController class.
	*/
    @TestSetup
    static void setupTestData(){
        List<Contact> contacts = new List<Contact>(); 
        Contact contact1 = new Contact(
            FirstName='John',
            LastName='Doe',
            Email='john@gmail.com',
            Phone='21212122121'       
        );
        contacts.add(contact1);
        
        Contact contact2 = new Contact(
            FirstName='Mark',
            LastName='Doe',
            Email='mark@gmail.com',
            Phone='98887989898'       
        );       
        contacts.add(contact2);
        
        User testUser = new User( firstname = 'Test',
                              lastName = 'User',
                              email = 'mark@gmail.com',
                              Username = 'TestUsermark@gmail.com',
                              EmailEncodingKey = 'ISO-8859-1',
                              Alias = 'abcd1',
                              TimeZoneSidKey = 'America/Los_Angeles',
                              LocaleSidKey = 'en_US',
                              LanguageLocaleKey = 'en_US',
                              ProfileId = '00e8d000002r4P0AAI'
                             );
        insert contacts;
        
        Test.startTest();
        insert testUser;
        Test.stopTest();        
    }
    
    /**
	* This test confirms that when the getContactUser() method is invoked with an email address that doesn't correspond to any user, 
    *  it correctly returns a null value.
	*/
    @isTest
    public static void testGetContactUser_noUserWithGivenEmail(){
        List<Contact> contacts = [SELECT Name, Email from Contact];
        ContactUserWrapper contactUserObj;
        if(contacts != null){
            contactUserObj = ContactUserController.getContactUser(contacts[0].email);
        }
        
        System.assertEquals(null, contactUserObj);
    } 
    
    /**
	* This test validates whether the getContactUser() method correctly retrieves a user's information when a valid email address is provided as input.
	*/
     @isTest
    public static void testGetContactUser_userWithGivenEmail(){
        List<Contact> contacts = [SELECT Name, Email from Contact where Email='mark@gmail.com'];
        ContactUserWrapper contactUserObj;
        if(contacts != null){
            contactUserObj = ContactUserController.getContactUser(contacts[0].email);
        }
        
        System.assertEquals('mark@gmail.com', contactUserObj.email);
    } 
        
    /**
	* This test verifies whether the getContactUser() method returns null when an empty string is provided as input.
	*/
    @isTest
    public static void testGetContactUser_blankEmail(){
        List<Contact> contacts = [SELECT Name, Email from Contact where Email='mark@gmail.com'];
        ContactUserWrapper contactUserObj;
        String blankEmailString = '';
        if(contacts != null){
            contactUserObj = ContactUserController.getContactUser(blankEmailString);
        }
        
        System.assertEquals(null, contactUserObj);
    } 
    
}