import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Partner } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private partnerSubject: BehaviorSubject<Partner>;
  public partner: Observable<Partner>;

  constructor(private router: Router, private http: HttpClient) {
    this.partnerSubject = new BehaviorSubject<Partner>(JSON.parse(localStorage.getItem('partner')));
    this.partner = this.partnerSubject.asObservable();
  }

  login(usernamePartner, password) {
    return this.http.post<Partner>(`http://localhost:8888/MoutteCAPI/backend/api/partner/login.php`, {usernamePartner, password}).pipe(
      map(partner => {
        localStorage.setItem('partner', JSON.stringify(partner));
        this.partnerSubject.next(partner);
        return partner;
      })
    )
  }
}

