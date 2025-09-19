import { computed, inject, Injectable, signal } from '@angular/core';
import { Contact } from '../models/contacts.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
   
  contacts = signal<Contact[]>([
  { name: 'Emma Rodriguez', phone: '676-542-5545', email: 'erodriguez87@outlook.com' },
  { name: 'Ethan White', phone: '236-447-5439', email: 'ewhite76@example.com' },
  { name: 'Emily Thomas', phone: '248-477-7402', email: 'ethomas63@hotmail.com' },
  { name: 'Ethan Harris', phone: '671-238-3654', email: 'eharris4@bizjournals.com' },
  { name: 'Mia White', phone: '877-931-5819', email: 'mwhite60@example.com' },
  { name: 'Harper Thompson', phone: '202-550-9356', email: 'hthompson96@bizjournals.com' },
  { name: 'Daniel Martinez', phone: '952-232-3453', email: 'dmartinez86@outlook.com' },
  { name: 'Mia Martinez', phone: '797-958-9651', email: 'mmartinez3@example.com' },
  { name: 'Liam Brown', phone: '401-388-7615', email: 'lbrown47@outlook.com' },
  { name: 'Noah Rodriguez', phone: '684-851-5583', email: 'nrodriguez33@bizjournals.com' },
  { name: 'Kumar Thompson', phone: '710-275-7641', email: 'kthompson77@company.org' },
  { name: 'Ava Taylor', phone: '555-491-3255', email: 'ataylor20@gmail.com' },
  { name: 'Sophia Thomas', phone: '904-864-8515', email: 'sthomas66@mail.com' },
  { name: 'Olivia Shan', phone: '428-857-6791', email: 'oshan68@gmail.com' },
  { name: 'Mason Smith', phone: '780-246-8472', email: 'msmith32@outlook.com' },
  { name: 'Daniel Taylor', phone: '731-241-7211', email: 'dtaylor76@example.com' },
  { name: 'Ethan Thompson', phone: '457-626-2721', email: 'ethompson15@bizjournals.com' },
  { name: 'Harper Brown', phone: '735-440-1916', email: 'hbrown31@mail.com' }
  ]);

  totalContacts = computed(() => this.contacts().length);

  maxReached = computed(() => this.totalContacts() >= 21);

  constructor() {}
  router = inject(Router);

  addContact(newContact: Contact) {
      // Other approch
      // this.contacts.set([newContact, ...this.contacts()]);
      setTimeout(() => {
        this.contacts.update(contacts => ([newContact, ...this.contacts()]));
        this.router.navigate(['']);
      }, 1000);
      
  }
  
  deleteContact(contact: Contact) {
    setTimeout(() => {
        this.contacts.update(contacts => contacts.filter(c => c.email !== contact.email));
      }, 1000);
  }
}
