import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { Profile } from 'src/app/models/profile';
import { DatePipe } from "@angular/common";
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.scss'],
})
export class MyDetailsComponent implements OnInit {
  isEmailFormDisabled: boolean = true;
  isProfileFormDisabled: boolean = true; 

  customerEmail:string;

  userDetails: Profile = {firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', email: '', CustomerID: ''};

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateOfBirth: new FormControl(new Date(''), [
      Validators.required,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(private _apiGatewayService: ApiGatewayService, private _datePipe: DatePipe, private _authService:AWSAuthService) {
    // need to get the customer id as well.
  }

  get firstName() {
    return this.profileForm.get('firstName').value;
  }

  get lastName() {
    return this.profileForm.get('lastName').value;
  }

  get dateOfBirth() {

    const DoB = this._datePipe.transform(this.profileForm.get('dateOfBirth').value, 'yyyy/MM/dd');

    return DoB;
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber').value;
  }

  ngOnInit(): void {
    this.profileForm.disable();
    this.emailForm.disable();

    this._authService.getUserAttributes().subscribe((data) => {
          this.customerEmail = data['email']; // Get the email of the customer currently logged in.
          // Get the Details of the Currently logged in customer.
          this._apiGatewayService.getCustomer(this.customerEmail).subscribe((data) => {
            this.userDetails.firstName = data['firstName'];
            this.userDetails.lastName = data['lastName'];
            this.userDetails.dateOfBirth = data['dateOfBirth'];
            this.userDetails.phoneNumber = data['phoneNumber'];
            this.userDetails.email = data['Email'];

              this.profileForm.setValue({
                firstName: this.userDetails.firstName,
                lastName: this.userDetails.lastName,
                dateOfBirth: new Date(this.userDetails.dateOfBirth),
                phoneNumber: this.userDetails.phoneNumber,
              });

              this.emailForm.setValue({
                email: this.userDetails.email,
              });
          });
        });
  }



  onProfileSubmit() {
    this._apiGatewayService
      .updateCustomerDetails(
        this.dateOfBirth.toString(),
        this.firstName,
        this.lastName,
        this.phoneNumber,
        this.customerEmail
      )
      .subscribe((data) => {
        console.log(data);
        this.profileForm.disable();
        this.isProfileFormDisabled = true;
      });
  }


  onEmailFormSubmit() {
     this._apiGatewayService
       .updateCustomerDetails(
         this.dateOfBirth.toString(),
         this.firstName,
         this.lastName,
         this.phoneNumber,
         this.customerEmail
       )
       .subscribe((data) => {
         console.log(data);
         this.emailForm.disable();
         this.isEmailFormDisabled = true;
       });
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
