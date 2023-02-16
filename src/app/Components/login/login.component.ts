import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupForm!: FormGroup;


 constructor(
    private formBuilder: FormBuilder,
    private authService: AWSAuthService,
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
    this.authService.signIn(this.email, this.password)
  }

}
