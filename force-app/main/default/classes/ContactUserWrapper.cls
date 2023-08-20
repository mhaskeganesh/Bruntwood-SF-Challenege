/**
 * @Author: Ganesh Shivaji Mhaske
 * @Date: 20 Aug 2023
 * @Task/User Story: Bruntwood SF Challenge Requirment 1
 * @Description:
 *             The ContactUserWrapper class is used to encapsulate user information retrieved from the User object.
 *             This wrapper class provides a structured format to pass user details to the Lightning Web Component (Ex. contactUserDetails).
 */
public class ContactUserWrapper {
    @AuraEnabled
    public String userId {get; set;}
	@AuraEnabled
    public String firstName {get; set;}
    @AuraEnabled
    public String lastName {get; set;}
    @AuraEnabled
    public String email {get; set;}
    @AuraEnabled
    public String phone {get; set;}

    public ContactUserWrapper(Id userId, String firstName, String lastName, String email, String phone){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastname;
        this.email = email;
        this.phone = phone;
    }     
}