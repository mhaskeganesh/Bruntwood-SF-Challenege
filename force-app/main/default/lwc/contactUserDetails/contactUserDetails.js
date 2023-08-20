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

    fetchContactUserDetails(email){
        if(email){
            getContactUser({email: email})
            .then((result) => {
                try{
                    if(result){   
                        this.contactUser = result;
                         this.isContactUserAvailable = true;
                    }else{
                        this.noUserMessage = 'No user found with this email address';
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