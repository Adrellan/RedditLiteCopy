import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { MaterialModule } from '../material.modules';
import { PrimeFacesModule } from 'src/primefaces.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './part/navbar/navbar.component';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RegisterComponent } from './page/register/register.component';
import { PostItemComponent } from './part/post-item/post-item.component';
import { PostListComponent } from './part/post-list/post-list.component';
import { CreatePostComponent } from './part/create-post/create-post.component';
import { UserBannerComponent } from './part/user-banner/user-banner.component';
import { FooterComponent } from './part/footer/footer.component';
import { ProfileComponent } from './page/profile/profile.component';
import { InsertPostComponent } from './page/insert-post/insert-post.component';
import { CommentItemComponent } from './part/comment-item/comment-item.component';

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
    FooterComponent,
    CommentItemComponent,
    ProfileComponent,
    InsertPostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    PrimeFacesModule,
    FormsModule,
    //RouterModule.forRoot(appRouting),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
