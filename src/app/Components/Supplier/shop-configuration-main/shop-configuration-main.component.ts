import { Component, OnInit } from '@angular/core';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { Order, Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-shop-configuration-main',
  templateUrl: './shop-configuration-main.component.html',
  styleUrls: ['./shop-configuration-main.component.scss'],
})
export class ShopConfigurationMainComponent implements OnInit {


  isLoading:boolean = true;
  SupplierInfo:Supplier;
  Orders:Order[];


  constructor(
    private _apiService: ApiGatewayService,
    private _authService: AWSAuthService
  ) {}

  ngOnInit(): void {
    this.getSupplierInfo();
  }


  getSupplierInfo(): void {
    this._authService.getUserAttributes().subscribe((attributes) => {
      if (attributes) {
        let SupplierEmail = attributes.email;
        // Get the products of the signed in user.
        this._apiService.getSupplier(SupplierEmail).subscribe(
          (data) => {
            const SupplierData = JSON.parse(JSON.stringify(data));
            this.SupplierInfo = SupplierData;
            this.Orders = this.SupplierInfo.Orders;
            this.isLoading = false;
            console.log('here : ',this.SupplierInfo);
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
      }
    });
  }


  getOrders():Order[]{
    return this.Orders;

  }
}
