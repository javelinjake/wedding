import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewFamilyComponent } from './components/view-family/view-family.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditFamilyComponent } from './components/edit-family/edit-family.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddFamilyComponent } from './components/add-family/add-family.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AdminGuard]},
  {path: 'settings', component: SettingsComponent, canActivate:[AdminGuard]},
  {path: 'family/edit/:id', component: EditFamilyComponent},
  {path: 'family/add', component: AddFamilyComponent},
  {path: 'family/:id', component: ViewFamilyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'accomodation', component: AccomodationComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AdminGuard]
})
export class AppRoutingModule { }
