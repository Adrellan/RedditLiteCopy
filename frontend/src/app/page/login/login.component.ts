import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  login(){
    if(this.loginForm.invalid) {alert("Érvénytelen felhasználónév vagy jelszó")}
    else{
      alert("Még nincs fiókod. Regisztrálj!");
    }
  }
}
