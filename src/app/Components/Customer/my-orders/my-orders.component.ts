import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { Profile } from 'src/app/models/profile';
import { Order } from 'src/app/models/supplier';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  Orders: Order[] = [];
  selectedOrder: Order;
  showOrderFlag:boolean = false;

  customerEmail: string;

  constructor(
    private _apiGatewayService: ApiGatewayService,
    private _authService: AWSAuthService
  ) {}

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((data) => {
      this.customerEmail = data['email'];
      // Get the Details of the Currently logged in customer.
      this._apiGatewayService
        .getCustomer(this.customerEmail)
        .subscribe((data) => {
          console.log(data);
          this.Orders = data['Orders'];
        });
    });
  }

  showOrder(order: Order) {
    this.selectedOrder = order;
    this.showOrderFlag = true;
  }

  closeModal(){
    this.showOrderFlag = false;
  }
}
