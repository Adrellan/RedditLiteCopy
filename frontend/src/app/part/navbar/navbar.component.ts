import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/page/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private dialogService: DialogService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Bejelentkezés / Regisztráció',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.showLoginDialog();
        },
      },
      {
        separator: true,
      },
      {
        label: 'Profil',
        icon: 'pi pi-fw pi-user',
      },
      {
        label: 'Bejegyzséseim',
        icon: 'pi pi-fw pi-reddit',
      },
    ];
  }

  showLoginDialog() {
    const ref = this.dialogService.open(LoginComponent, {
      header: 'Bejelentkezés',
      width: '480px',
      height: '600px',
      
      contentStyle: {width:"100%", display:"flex",justifyContent:"center", alignItems:"center"},
      baseZIndex: 10000,
      maximizable: true,
    });

    ref.onClose.subscribe((response: any) => {});
  }
}
