import { Component, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts';
import { Contact } from '../../models/contacts.model';

@Component({
  selector: 'app-contacts-list',
  standalone: false,
  templateUrl: './contacts-list.html',
  styleUrl: './contacts-list.scss'
})
export class ContactsListComponent {
  contactService = inject(ContactsService);
    contacts = this.contactService.contacts

    delete(contact: Contact) {
      console.log('contact', contact.name, 'Deleted Succesfully');
      this.contactService.deleteContact(contact)
    }
}
