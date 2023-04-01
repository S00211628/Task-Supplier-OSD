import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { PasswordService } from 'src/app/Services/password.service';

@Component({
  selector: 'app-confirm-forgot-password',
  templateUrl: './confirm-forgot-password.component.html',
  styleUrls: ['./confirm-forgot-password.component.scss'],
})
export class ConfirmForgotPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(
    private _authService: AWSAuthService,
    private _passwordService: PasswordService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        this._passwordService.passwordValidator,
      ]),
      code: new FormControl(null, [Validators.required]),
    });
  }

  get password() {
    return this.resetPasswordForm.get('password').value;
  }

  get passwordErrors() {
    return this.resetPasswordForm.get('password');
  }

  get code() {
    return this.resetPasswordForm.get('code').value;
  }

  get codeErrors() {
    return this.resetPasswordForm.get('code');
  }

  onSubmit() {
    const userEmail = this._activatedRoute.snapshot.paramMap.get('email')
    this._authService.confirmForgotPassword(userEmail,this.password, this.code);
  }
}
