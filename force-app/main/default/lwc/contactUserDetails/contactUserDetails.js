/**
 * Author: Ganesh Shivaji Mhaske
 * Date: 20 Aug 2023
 * Description: This Lightning Web Component (LWC) is designed to be placed on a Contact record page.
 *              It interacts with an Apex method to retrieve user information based on the email address of the associated Contact.
 *              The LWC displays the retrieved user information if available, along with appropriate messages if no user is found or the Contact lacks an email address.
 */
import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone'; 
import getContactUser from '@salesforce/apex/ContactUserController.getContactUser';
import { NavigationMixin } from 'lightning/navigation';

export default class ContactUserDetails extends NavigationMixin(LightningElement){
    
    @api recordId;
    @api noUserMessage;
    contactRecord;
    contactUser;
    isContactUserAvailable = false;

    /**
    * Retrieves contact record information using the @wire service to track changes in the record's fields.
    * If contact data is successfully retrieved, it updates the component's contactRecord and triggers the retrieval
    * of associated user information using the email address.
    * @param {Object} response - Contains information about the contact record or any error encountered.
    */
    @wire(getRecord, {recordId: '$recordId', fields:[CONTACT_FIRSTNAME, CONTACT_LASTNAME, CONTACT_EMAIL, CONTACT_PHONE]})
    wiredContact({error, data}){
        if(data){
            this.contactRecord = {
                FirstName: getFieldValue(data, CONTACT_FIRSTNAME),
                LastName: getFieldValue(data, CONTACT_LASTNAME),
                Email: getFieldValue(data, CONTACT_EMAIL),
                Phone: getFieldValue(data, CONTACT_PHONE),
            }
            this.fetchContactUserDetails(this.contactRecord.Email);
        }else if(error){
            this.isContactUserAvailable = false;
            console.log('Error while fetching contact details: ',error);
        }   
    }

    

    /**
    * Fetches user information by impeartively calling apex method 'getContactUser' based on the provided email address and updates the component's state accordingly.
    * @param {String} email - The email address of the contact to retrieve user information for.
    */
    fetchContactUserDetails(email){
        if(email){
            getContactUser({email: email})
            .then((result) => {
                try{
                    if(result){   
                        this.contactUser = result;
                         this.isContactUserAvailable = true;
                    }else{
                        this.noUserMessage = 'No user found with this email address- '+email;
                        this.random = {};
                        this.isContactUserAvailable = false;
                    }  
                }catch(error){
                    console.log('Exception: ', error);
                }                         
            })
            .catch((error) => {
                this.user1 = {};
                this.isContactUserAvailable = false;
                console.log('Error while fetching user-contact details', error);
            })
        }else{
            this.noUserMessage = 'Email address required to see the Contact User';
            this.random = {};
            this.isContactUserAvailable = false;
        }
    }

    /**
    * Navigates to the User's detail page upon clicking the "View User Detail" button.
    * Uses the Lightning NavigationMixin to navigate to the User's details page.
    * @param {Event} event - The event object representing the button click.
    */
    handleViewUser(event){
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId: this.contactUser.userId,
                    objectApiName:'User',
                    actionName:'view'
                },
            })    
    }
}