import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  errorMessage = 'Mail ou mot de passe incorrect';
  loading = false;
  submitted = false;


  constructor(private fb: FormBuilder, private dataService: AuthService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      usernamePartner: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  get f() { return this.signinForm.controls }

  onSubmit() {
    this.submitted = true;
    if(this.signinForm.invalid) {
      return;
    }

    this.loading = true;
    this.dataService.login(this.f.usernamePartner.value, this.f.password.value).pipe(first()).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        console.log(error);
        this.loading = false;
      }
    });
  }

}

