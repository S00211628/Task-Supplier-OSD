import { Component, OnInit } from '@angular/core';
import { Customer, Product } from 'src/app/models/supplier';
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  Products: Product[];
  UserEmail: string;
  SupplierIDs: string[];
  SupplierShopNames: string[] = [];
  totalPrice: number = 0;
  quantity = 0;

  isLoading = true;

  constructor(
    private _router: Router,
    private _authService: AWSAuthService,
    private _apiService: ApiGatewayService
  ) {}

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((data) => {
      this.UserEmail = data['email']; // Get the basket items for the customer that is logged in.
      this._apiService.getCustomer(this.UserEmail).subscribe((customer) => {
        this.Products = customer['Basket'];

        console.log(JSON.stringify(this.Products));

        // Get the total for all the products
        for (const product of this.Products) {
          const quantity = product.product_quantity || 1; // set default quantity to 1
          const price = product.product_price;
          const totalProductPrice = quantity * price;
          this.totalPrice += totalProductPrice;
        }

        // Get all the suppliers details from the supplierIDs returned.
        const _supplierIDs = this.Products.map((product) => product.SupplierID);
        const promises = _supplierIDs.map((supplierId) => {
          return this._apiService.getSupplierByID(supplierId).toPromise();
        });

        // Wait for all them to be returned at once so the appear in the same order as in the products array.
        Promise.all(promises).then((suppliers) => {
          for (let i = 0; i < suppliers.length; i++) {
            const supplier = suppliers[i];
            this.SupplierShopNames[i] = supplier.shop_name;
            console.log('supplier shop names : ', this.SupplierShopNames[i]);
          }
          this.isLoading = false;
        });
      });
    });
  }

  getSupplierInfoByID(SupplierID: string) {}

  editProductInBasket(product: Product, quantity: number) {
    // this._router.navigate(['/customer/basket/edit', product.product_id]);
  }

  removeProductFromBasket(product: Product) {
    // this._apiService.removeProductFromBasket(this.UserEmail, product.product_id).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
