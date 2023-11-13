// api.service.ts
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private baseApiService: BaseApiService) {}

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
}
