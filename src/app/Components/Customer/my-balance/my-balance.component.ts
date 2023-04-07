import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-my-balance',
  templateUrl: './my-balance.component.html',
  styleUrls: ['./my-balance.component.scss'],
})
export class MyBalanceComponent implements OnInit {
  isBalanceFormDisabled: boolean = true;

  customerEmail: string;

  userDetails: Profile = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    CustomerID: '',
    balance: '' ,
  };

  balanceForm = new FormGroup({
    balance: new FormControl('', [
      Validators.required,
      
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(
    private _apiGatewayService: ApiGatewayService,
    private _authService: AWSAuthService
  ) {}

  get balance() {
    return this.balanceForm.get('balance').value;
  }

  ngOnInit(): void {
    this.balanceForm.disable();

    this._authService.getUserAttributes().subscribe((data) => {
      this.customerEmail = data['email'];
      // Get the Details of the Currently logged in customer.
     this._apiGatewayService
       .getCustomer(this.customerEmail)
       .subscribe((data) => {
         this.userDetails.firstName = data['firstName'];
         this.userDetails.lastName = data['lastName'];
         this.userDetails.dateOfBirth = data['dateOfBirth'];
         this.userDetails.phoneNumber = data['phoneNumber'];
         this.userDetails.email = data['Email'];
         this.userDetails.balance = data['balance'];


         this.balanceForm.setValue({
           balance: this.userDetails.balance,
         });
       });
    });
  }

  onBalanceSubmit() {
    this._apiGatewayService
      .updateCustomerDetails(
        this.userDetails.dateOfBirth.toString(),
        this.userDetails.firstName,
        this.userDetails.lastName,
        this.userDetails.phoneNumber,
        this.userDetails.email,
        this.balance,
      )
      .subscribe((data) => {
        this.balanceForm.disable();
        this.isBalanceFormDisabled = true;
      });
  }

  enableBalanceForm() {
    this.balanceForm.enable();
    this.isBalanceFormDisabled = false;
  }
}

