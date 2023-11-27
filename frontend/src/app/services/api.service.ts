// api.service.ts
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, from } from 'rxjs';
import { AuthenticationService } from './authentication.service'


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private baseApiService: BaseApiService,
              private authService: AuthenticationService) {}

  // Példa GET kérés
  getSomeData(): Observable<any> {
    return from(this.baseApiService.getApi().get('/data'));
  }

  postRegister(user: any): Promise<any> {
    return this.baseApiService.getApi().post('/register', user);
  }

  postLogin(user: any): Promise<any> {
    return this.baseApiService.getApi().post('/login', user);
  }

  getLogout(): Promise <any>{
      const token1 = this.authService.getCookie('AUTH_TOKEN');
      const token2 = this.authService.getCookie('AUTH_SIGNATURE');

      const headers = {
        'Authorization': `Bearer ${token1} ${token2}`
      };
      return this.baseApiService.getApi().get('/logout');
  }

  isLoggedIn(): boolean{
    const token1 = this.authService.getCookie('AUTH_TOKEN');
    const token2 = this.authService.getCookie('AUTH_SIGNATURE');

    return !(token1 == null || token2 == null);
  }

}
