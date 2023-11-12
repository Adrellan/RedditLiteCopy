import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';

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
    public ref: DynamicDialogRef
  ) {}

  openLoginDialog() {
    const ref = this.dialogService.open(LoginComponent, {
      header: 'Bejelentkezés',
      width: '40%',
      contentStyle: { 'max-height': '50vh', overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.close();
    // ref.onClose.subscribe((response: any) => {
    //   if (response) {

    //   }
    // });
  }

  register() {
    console.log('User Registered:', this.user);
    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }
}
