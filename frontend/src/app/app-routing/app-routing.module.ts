import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../page/home/home.component';
import { LoginComponent } from '../page/login/login.component';
import { RegisterComponent } from '../page/register/register.component';



const routes: Routes = [
<<<<<<< HEAD
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: HomeComponent}
=======
 {path: '', component: HomeComponent},
 {path: 'login', component: LoginComponent},
 {path: 'register', component: RegisterComponent},
 {path: '**', component: HomeComponent}
>>>>>>> origin/staging
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
