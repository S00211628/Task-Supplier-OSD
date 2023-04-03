import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss'],
})
export class MyDetailsComponent implements OnInit {
  isEmailFormDisabled: boolean = true;
  isProfileFormDisabled: boolean = true; 
  userDetails: Profile = {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '01/01/1990',
    phoneNumber: '1234567890',
    customerID: 123456,
    email: 'martinmel218@gmail.com',
  };

  emailForm = new FormGroup({
    email: new FormControl(this.userDetails.email, [
      Validators.required,
      Validators.email,
    ]),
  });

  profileForm = new FormGroup({
    firstName: new FormControl(this.userDetails.firstName, [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl(this.userDetails.lastName, [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateOfBirth: new FormControl(new Date(this.userDetails.dateOfBirth), [
      Validators.required,
    ]),
    phoneNumber: new FormControl(this.userDetails.phoneNumber, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor() {
    // need to get the customer id as well.
  }

  ngOnInit(): void {
    this.profileForm.disable();
    this.emailForm.disable();
  }

  onProfileSubmit() {
    console.log(this.profileForm)
    this.profileForm.disable();
    this.isProfileFormDisabled = true;
  }

  onEmailFormSubmit() {
    console.log(this.emailForm);
    this.emailForm.disable();
    this.isEmailFormDisabled = true;
  }

  enableProfileForm() {
    this.profileForm.enable();
    this.isProfileFormDisabled = false;
  }

  enableEmailForm() {
    this.emailForm.enable();
    this.isEmailFormDisabled = false;
  }

}
