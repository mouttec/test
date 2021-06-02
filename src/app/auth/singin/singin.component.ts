import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from './../../api.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage = 'Mail ou mot de passe incorrect';

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
              this.signinForm = this.fb.group({
                usernamePartner: ['', Validators.required],
                password: ['', Validators.required]
                });
              }

  ngOnInit(): void {}

  postdata(signinForm1: any): void {
    this.dataService.userlogin(signinForm1.value.usernamePartner, signinForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
                const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/calcul';
                this.router.navigate([redirect]);
                console.log(data);

          },
          error => {
            console.log(error);
            alert(this.errorMessage);

          });
  }

  get usernamePartner(): AbstractControl { return this.signinForm.get('usernamePartner'); }

  get password(): AbstractControl { return this.signinForm.get('password'); }

}
