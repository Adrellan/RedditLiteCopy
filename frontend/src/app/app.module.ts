import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

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
    AppRoutingModule,
    PanelModule,
    InputTextModule,
    MaterialModule,
    AccordionModule,
    ToolbarModule,
    InputTextareaModule,
    DividerModule,
    //RouterModule.forRoot(appRouting),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
