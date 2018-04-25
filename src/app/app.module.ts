import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FamilyService } from './services/family.service';

import { AppComponent } from './app.component';
import { ViewFamilyComponent } from './components/view-family/view-family.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditFamilyComponent } from './components/edit-family/edit-family.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFamilyComponent } from './components/add-family/add-family.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from './/app-routing.module';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ViewFamilyComponent,
    SettingsComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    EditFamilyComponent,
    DashboardComponent,
    AddFamilyComponent,
    AccomodationComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule
  ],
  providers: [FamilyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
