import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage = 'Veuillez remplir tous les champs';

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
                this.signupForm = this.fb.group({
                  name: ['', Validators.required],
                  firstName: ['', Validators.required],
                  email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
                  password: ['', Validators.required],
                  phone: ['', Validators.required],
               });
              }
ngOnInit(): void {
}
postdata(signupForm1: any): void {
  this.dataService.userregistration(signupForm1.value.name, signupForm1.value.firstName, signupForm1.value.email, signupForm1.value.password, signupForm1.value.phone)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['/booking']);
        },
        error => {
        });
}
get email(): AbstractControl { return this.signupForm.get('email'); }
get password(): AbstractControl { return this.signupForm.get('password'); }
get name(): AbstractControl { return this.signupForm.get('name'); }
get firstName(): AbstractControl { return this.signupForm.get('firstName'); }
get phone(): AbstractControl { return this.signupForm.get('phone'); }

}
