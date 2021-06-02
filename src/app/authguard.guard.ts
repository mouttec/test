import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from './services/account.service';


@Injectable({
providedIn: 'root'
})

export class AuthguardGuard {

  constructor(private accountService: AccountService, private router: Router ) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const user = this.accountService.userValue;
  //   if (user) {
  //       // authorised so return true
  //       return true;
  //   }

  //   // not logged in so redirect to login page with the return url
  //   this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
  //   return false;
  // }
}
