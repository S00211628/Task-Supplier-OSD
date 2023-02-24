import { Component, OnInit } from '@angular/core';
import { Customer, Product } from 'src/app/models/supplier';
import { Router } from "@angular/router";
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {


  Products:Product[];
  UserEmail:string;

  constructor(private _router:Router, private _authService:AWSAuthService, private _apiService:ApiGatewayService  ) { }

  ngOnInit(): void {


    this._authService.getUserAttributes().subscribe((data) => {
      this.UserEmail = data['email'];
      console.log("Email : ", this.UserEmail);

      this._apiService.getCustomer(this.UserEmail).subscribe((customer) => {
        this.Products = customer['Basket'];
        console.log("Products : ", this.Products)

      })
    })

    console.log(this.Products)

  }

}
