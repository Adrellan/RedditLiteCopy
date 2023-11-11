import { Injectable } from '@angular/core';
import {AxiosInstance} from "axios";
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root',

})
export class BaseApiService {


  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        "Content-Type": "application/json"
      },
      //Sending the cookies to the backend service
      withCredentials:true,
    })
  }
  public getApi(){
    return this.api
  }



}
