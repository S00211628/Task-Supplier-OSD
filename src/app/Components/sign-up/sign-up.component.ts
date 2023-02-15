import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AWSAuthService } from '../../Services/awsauth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AWSAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
    });
  }

  get email() {
    return this.signupForm.get('email')!.value;
  }

  get password() {
    return this.signupForm.get('password')!.value;
  }

  get role(){
    return this.signupForm.get('role')!.value
  }


  onSubmit() {
    if (this.signupForm.valid) {
      this.authService
        .signUp(
          this.email,
          this.password,
          this.role
        )
        .then(() => {
          console.log('Successfully signed up user');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
