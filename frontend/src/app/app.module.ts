import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './part/navbar/navbar.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { PostItemComponent } from './part/post-item/post-item.component';
import { PostListComponent } from './part/post-list/post-list.component';
import {PanelModule} from "primeng/panel";
import {InputTextModule} from "primeng/inputtext";
import {MaterialModule} from "../material.modules";
import {AccordionModule} from "primeng/accordion";
import {ToolbarModule} from "primeng/toolbar";
import { CreatePostComponent } from './part/create-post/create-post.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { UserBannerComponent } from './part/user-banner/user-banner.component';
import {DividerModule} from "primeng/divider";

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PostItemComponent,
    PostListComponent,
    CreatePostComponent,
    UserBannerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
<<<<<<< HEAD
    PanelModule,
    InputTextModule,
    MaterialModule,
    AccordionModule,
    ToolbarModule,
    InputTextareaModule,
    DividerModule,
    //RouterModule.forRoot(appRouting),
=======
    FormsModule,
    ButtonModule
>>>>>>> a30f890 (add prime faces)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
