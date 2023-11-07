import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './part/navbar/navbar.component';
import { PostComponent } from './part/post/post.component';
import { CommentComponent } from './part/comment/comment.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'material.modules';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostComponent,
    CommentComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    //RouterModule.forRoot(appRouting),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
