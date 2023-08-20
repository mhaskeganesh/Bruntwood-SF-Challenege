import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone'; 
import getContactUser from '@salesforce/apex/ContactUserController.getContactUser';

export default class ContactUserDetails extends LightningElement {
    
    @api recordId;
    contactRecord;
    isContactUserAvailable = false;
    noUserMessage = 'User not found';

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

   random;
    fetchContactUserDetails(email){
        if(email){
            getContactUser({email: email})
            .then((result) => {
                let data1;
                if(result){
                    console.log('*****233Inside22333****');
                    this.random = result;
                    data1 = result
                    this.isContactUserAvailable = true;
                }else{
                    this.random = {};
                    this.isContactUserAvailable = false;
                }
            //     console.log('Result: ',result);
            //     console.log('User found 1: ',this.random);
            //     console.log('Data 1: ',data1);
            // 
            })
            .catch((error) => {
                this.user1 = {};
                this.isContactUserAvailable = false;
                console.log('Error while fetching user-contact details', error);
            })
        }else{
            this.random = {};
            this.isContactUserAvailable = false;
        }
    }
    
}