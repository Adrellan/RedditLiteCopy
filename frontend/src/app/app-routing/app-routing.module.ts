import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../page/home/home.component';
import { LoginComponent } from '../page/login/login.component';
import { RegisterComponent } from '../page/register/register.component';
// import { ProfileComponent } from '../page/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: 'profile', component: ProfileComponent},
  {path: '**', component: HomeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
