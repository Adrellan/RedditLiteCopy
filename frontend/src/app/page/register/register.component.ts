import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: any = {};

  constructor(
    private router: Router,
    private dialogService: DialogService,
    public ref: DynamicDialogRef,
    private apiService: ApiService
  ) {}

  openLoginDialog() {
    const ref = this.dialogService.open(LoginComponent, {
      header: 'Bejelentkezés',
      width: '500px',
      height: '750px',
      
      contentStyle: {width:"100%", display:"flex",justifyContent:"center", alignItems:"center"},
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.close();
    // ref.onClose.subscribe((response: any) => {
    //   if (response) {

    //   }
    // });
  }

  // register() {
  //   // this.apiService.postRegister(this.user);
  //   console.log('User Registered:', this.user);
  //   this.ref.close();
  // }

  async register() {
    this.apiService.postRegister(this.user).then(
      response => {
        console.log('Registration Successful:', response);
        this.ref.close();
      },
    ).catch(error => {
      console.log(error);
    })
  }
  

  cancel() {
    this.ref.close();
  }
}
