import { LightningElement, api, wire, track } from 'lwc';

export default class ContactUserDetails extends LightningElement {
    isContactUserAvailable = false;
    @track user;
}