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
  Customer:Customer;

  isEditingProductInBasket: boolean = false;
  isLoading = true;

  constructor(
    private _router: Router,
    private _authService: AWSAuthService,
    private _apiService: ApiGatewayService
  ) {}

  ngOnInit(): void {
    this.getBasketItems();
  }

  getBasketItems() {
    this.totalPrice = 0;
    this.isLoading = true;
    this._authService.getUserAttributes().subscribe((data) => {
      this.UserEmail = data['email']; // Get the basket items for the customer that is logged in.
      this._apiService.getCustomer(this.UserEmail).subscribe((customer) => {
        this.Products = customer['Basket'];
        this.Customer = customer as Customer;


        // Get the total for all the products
        for (const product of this.Products) {
          const quantity = product.product_quantity || 1; // set default quantity to 1
          product.isEditing = false;
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
          }
          this.isLoading = false;
        });
      });
    });
  }

  getSupplierInfoByID(SupplierID: string) {}

  onQuantityChanged(quantity: number, productId: string) {
    for (let i = 0; i < this.Products.length; i++) {
      if (this.Products[i].product_id === productId) {
        this.Products[i].product_quantity = quantity;

        break;
      }
    }
  }

  editProductInBasket(product: Product, quantity: number) {
    this.isEditingProductInBasket = true;
    product.isEditing = true;
  }

  confirmProductEdit(product: Product, quantity: number) {
    this.isEditingProductInBasket = false;
    product.isEditing = false;

    this._apiService
      .updateProductInBasket(this.UserEmail, product, quantity)
      .subscribe(() => {
        this.getBasketItems();
      });
  }

  checkout(){

    console.log('=======================================');
    console.log("Customer :" ,this.Customer);
    console.log("Basket Items :" ,this.Products);
    console.log("Total Price :" ,this.totalPrice);
    console.log('=======================================');

    this._router.navigate(['/checkout'], { queryParams: { basketItems: JSON.stringify(this.Products), Customer: JSON.stringify(this.Customer), totalPrice: this.totalPrice } });

  }

  removeProductFromBasket(product: Product) {
    this._apiService
      .removeProductFromBasket(this.UserEmail, product)
      .subscribe((data) => {
        console.log(data);
        this.getBasketItems();
      });
  }
}
