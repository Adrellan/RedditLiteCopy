import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData: any = {};

  constructor(
    private router: Router, 
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    ) {}

  openRegistrationDialog() {
    const ref = this.dialogService.open(RegisterComponent, {
      header: 'Regisztráció',
      width: '40%',
      contentStyle: { 'max-height': '50vh', overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
    
    this.ref.close();
    // ref.onClose.subscribe((response: any) => {
    //     if (response) {

    //     }
    // });
  }

  ngOnInit(): void {}

  login() {
    this.ref.close();
  }

  redirectToHome(){
    this.router.navigate(['/']);
  }
}