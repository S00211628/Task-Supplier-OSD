import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Product } from 'src/app/models/supplier';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  constructor(
    private _authService: AWSAuthService,
    private _apiService: ApiGatewayService,
    private _router: Router
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    // Get the email of the signed in user.
    this._authService.getUserAttributes().subscribe((attributes) => {
      if (attributes) {
        let SupplierEmail = attributes.email;
        // Get the products of the signed in user.
        this._apiService.getSupplier(SupplierEmail).subscribe(
          (data) => {
            const SupplierData = JSON.parse(JSON.stringify(data));
            this.products = SupplierData.Products;
            console.log(this.products[0].product_name);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }


  goToEditProduct(product: Product) {

    const navigationExtras: NavigationExtras = {
      state:{
        product: product
      }
    };
    this._router.navigate(['/edit-product'], navigationExtras);

  }

}
