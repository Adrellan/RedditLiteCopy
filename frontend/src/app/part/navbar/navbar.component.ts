import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router module
import { BrowserModule } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginComponent } from 'src/app/page/login/login.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  deaultItems : MenuItem[]  = [
    {
      label: 'Bejelentkezés / Regisztráció',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.showLoginDialog();
      },
      logged: false,
    },
    {
      label: 'Kijelentkezés',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.apiService.getLogout();
      },
      logged: true,
    },
    {
      separator: true,
    },
    // {
    //   label: 'Profil',
    //   icon: 'pi pi-fw pi-user',
    //   logged: true,
    //   command: () => {
    //     this.router.navigate(['/profile']);
    //   }
    // },
    // {
    //   label: 'Bejegyzséseim',
    //   icon: 'pi pi-fw pi-reddit',
    //   logged: true,
    // },
  ];

  items: MenuItem[] | undefined;

  constructor( 
    private dialogService: DialogService,
    private apiService: ApiService,
    private browser: BrowserModule,
    private router: Router,
    ) 
    {}


    
  ngOnInit() {
    this.renderMenu();
  }

  renderMenu():void{
    const isLoggedIn = this.apiService.isLoggedIn();
    console.log(isLoggedIn);
    this.items = this.deaultItems.filter((x : any) => x.logged === isLoggedIn);
  }

  showLoginDialog() {
    const ref = this.dialogService.open(LoginComponent, {
      header: 'Bejelentkezés',
      width: '500px',
      height: '750px',
      
      contentStyle: {width:"100%", display:"flex",justifyContent:"center", alignItems:"center"},
      baseZIndex: 10000,
      maximizable: true,
    });

    ref.onClose.subscribe((response: any) => {
      this.renderMenu();
    });
  }
}
