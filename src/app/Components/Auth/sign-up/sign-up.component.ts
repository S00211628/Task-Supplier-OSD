import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/Services/password.service';
import { AWSAuthService } from '../../../Services/awsauth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AWSAuthService,
    private _router: Router,
    private _passwordService:PasswordService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this._passwordService.passwordValidator]],
      role: ['', Validators.required],
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

  onSubmit() {
      this.authService.signUp(this.email, this.password, this.role)
  }
}
