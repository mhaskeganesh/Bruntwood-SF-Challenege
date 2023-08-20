/**
 * @Author: Ganesh Shivaji Mhaske
 * @Date: 20 Aug 2023
 * @Task/User Story: Bruntwood SF Challenge Requirment 1
 * @Description: 
 *               The ContactUserController class serves as a controller for the "contactUserDetail" Lightning Web Component (LWC).
 * 				 This controller retrieves user information associated with a contact's email address.
 */
public class ContactUserController {
     /**
     * @description- Retrieves user information based on provided email.
     * @param email The email address of the contact to retrieve user information for.
     * @return ContactUserWrapper instance containing user details, or null if no user found or invalid input.
     */
	@AuraEnabled
    public static ContactUserWrapper getContactUser(String email){
        try{
            if(String.isBlank(email)){
                return null;
            }
            
            User user = [
                SELECT Id, FirstName, LastName, Email, Phone 
                FROM User 
                WHERE Email=:email 
                LIMIT 1
            ];
            
            if(user != null){
                return new ContactUserWrapper(user.Id, user.FirstName, user.LastName, user.Email, user.Phone);
            }            
        }catch(Exception e){
            System.debug('Excpetion at ContactUserController: '+e.getMessage());
        }
        return null;
    }
}