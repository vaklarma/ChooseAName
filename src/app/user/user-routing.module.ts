import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'registration', component: RegistrationComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'login', component: LoginComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
