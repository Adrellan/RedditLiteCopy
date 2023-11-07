import { Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/page/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //TODO
  //Valamiért nem középen van a login gomb

  constructor(
    public dialog: MatDialog,
  ) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      disableClose: true,
      //data: { }
    });
  }
}
