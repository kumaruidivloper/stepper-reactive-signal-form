import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared-module';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ContactsListComponent } from './components/contacts-list/contacts-list';
import { AddContactComponent } from './components/add-contact/add-contact';

@NgModule({
  declarations: [
    App,
    ContactsListComponent,
    AddContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
