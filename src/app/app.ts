import { Component, effect, inject } from '@angular/core';
import { ContactsService } from './services/contacts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Angular Signal CRUD';

  contactService = inject(ContactsService);
  totalContacts = inject(ContactsService).totalContacts;
  maxReached = this.contactService.maxReached;

  snackbar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if(this.maxReached()) {
        this.snackbar.open("You've reached your limit. Please remove some contacts before adding again!", 'Close', {
          duration: 5000 // closes automatically after 5 seconds
        });
      }

    })
  }
}
