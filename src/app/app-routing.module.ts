import { CalculComponent } from './calcul/calcul.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from 'src/app/home/home.component';

import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { SinginComponent } from './auth/singin/singin.component';
import { SingupComponent } from './auth/singup/singup.component';


// const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
// const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthguardGuard]},
  // { path: 'users', loadChildren: usersModule, canActivate: [AuthguardGuard]},
  // { path: 'account', loadChildren: accountModule, canActivate: [AuthguardGuard]},
  // { path: '**', redirectTo: ''}

  { path: 'admin', component: AdminComponent },
  {path: 'auth', component: AuthComponent},
  {path: 'auth/signin', component: SinginComponent},
  {path: 'auth/signup', component: SingupComponent},
  { path: 'calcul', component: CalculComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
