import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list';
import { AddContactComponent } from './components/add-contact/add-contact';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ContactsListComponent},
  {path: 'add', component: AddContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
