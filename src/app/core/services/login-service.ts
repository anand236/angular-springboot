import { inject, Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser } from '../models/login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private http = inject(HttpClient)

  public registerUser(payload: IRegisterUser) {
    return this.http.post(environment.apiUrl + 'create', payload);
  }

  public loginUser(payload: ILoginUser) {
    return this.http.post(`${environment.apiUrl}login`, payload);
  }

}
