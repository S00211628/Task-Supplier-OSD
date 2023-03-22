import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupForm!: FormGroup;
  errorMessage:string;


 constructor(
    private formBuilder: FormBuilder,
    private authService: AWSAuthService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.signupForm.get('email')!.value;
  }

  get password() {
    return this.signupForm.get('password')!.value;
  }

  get role() {
    return this.signupForm.get('role')!.value;
  }

  get emailErrors() {
    return this.signupForm.get('email');
  }

  get passwordErrors() {
    return this.signupForm.get('password');
  }

  onSubmit(){
    this.authService.login(this.email, this.password).subscribe(
      (isLoggedIn) =>{
        if (isLoggedIn){
          this.errorMessage = null;
        }
      },
      (error) =>{
        console.error(error);
        this.errorMessage = "Incorrect Email or Password."
      }
    )
  }

  goToSignUp(){
    this._router.navigate(['sign-up'])
  }

}
