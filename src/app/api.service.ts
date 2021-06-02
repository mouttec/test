import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  redirectUrl: string;
  baseUrl = 'http://localhost:8888/MoutteCAPI/backend/api/partner';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor( private httpClient: HttpClient) { }
  public userlogin(usernamePartner: any, password: any): any {
    return this.httpClient.post<any>(this.baseUrl + '/loginPartner.php', { usernamePartner, password})
    .pipe(map(Partners  => {
      this.setToken(Partners.namePartner);
      this.getLoggedInName.emit(true);
      return Partners;
    }));
  }

  public userregistration(usernamePartner: any, namePartner: any, mailPartner: any, phonePartner: any, password: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { usernamePartner, namePartner, mailPartner, phonePartner , password})
    .pipe(map(Partners => {
      return Partners;
    }));
  }

  // token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }
}
