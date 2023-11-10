import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { PrimeFacesModule } from 'src/primefaces.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './part/navbar/navbar.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeFacesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
