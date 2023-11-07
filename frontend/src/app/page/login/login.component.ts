import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/service/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title: string = "LMAO";
username: string;
password: string;

  constructor(
    private baseService: BaseService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  onSaveClick() {
    this.dialogRef.close("A dialógus ablak bezárult.");
  }

  onCancelClick() {
    this.dialogRef.close("A dialógus ablak bezárult.");
  }
}
