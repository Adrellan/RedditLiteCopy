import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterComponent } from '../register/register.component';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'primeng/api'; // Importáljuk a PrimeNG MessageService-t


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData: any = {};
  msgs: any[] = [];

  constructor(
    private router: Router, 
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private apiService: ApiService,
    private messageService: MessageService
    ) {}

  openRegistrationDialog() {
    const ref = this.dialogService.open(RegisterComponent, {
      header: 'Regisztráció',
      width: '500px',
      height: '850px',
      
      contentStyle: {width:"100%", display:"flex",justifyContent:"center", alignItems:"center"},
      baseZIndex: 10000,
      maximizable: true,
    });
    
    this.ref.close();
    // ref.onClose.subscribe((response: any) => {
    //     if (response) {

    //     }
    // });
  }

  ngOnInit(): void {}

  async login() {
    this.apiService.postLogin(this.loginData).then(
      response => {
        console.log('Login Successful:', response);
        this.ref.close();
      },
    ).catch(error => {
      console.log('Login Error:', error);
      if (error.status === 401) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid username or password'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Kérem ellenőrizze a megadott adatokat.'
        });
      }
    })
  }

  async LogOut(){
    console.log("mukodik a tesztgomb");
    this.apiService.getLogout().then(
      response => {
        console.log('Logout Succesfull:', response);
        this.ref.close();
      },
    ).catch(error => {
      console.log(error);
    })
  }

  redirectToHome(){
    this.router.navigate(['/']);
  }
}