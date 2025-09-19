import { ContactsService } from './../../services/contacts';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.html',
  styleUrl: './add-contact.scss'
})
export class AddContactComponent {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  contactsService = inject(ContactsService);

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted:', this.contactForm.value);
      this.contactsService.addContact(this.contactForm.value);
      // Save logic here
    }
  }

}
