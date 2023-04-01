import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  EmailForm!: FormGroup;
  userEmail!:string;

  constructor(private _authService: AWSAuthService) {}

  ngOnInit(): void {
    this.EmailForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
    });
  }

  get email() {
    return this.EmailForm.get('email').value;
  }

  get emailErrors() {
    return this.EmailForm.get('email');
  }


  onSubmit() {
    this._authService.forgotPassword(this.email);
  }
}
