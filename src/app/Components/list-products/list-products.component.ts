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
  _productToDelete: Product;
  _productToDeleteName:string;
  isModalVisible = false;
  isLoading = true;

  ngOnInit(): void {
    // Get the email of the signed in user.
    this.loadproduct();
  }

  loadproduct():void{
  this._authService.getUserAttributes().subscribe((attributes) => {
      if (attributes) {
        let SupplierEmail = attributes.email;
        // Get the products of the signed in user.
        this._apiService.getSupplier(SupplierEmail).subscribe(
          (data) => {
            const SupplierData = JSON.parse(JSON.stringify(data));
            this.products = SupplierData.Products;
            this.isLoading = false;
            console.log(this.products[0].product_name);
          },
          (error) => {
            console.log(error);
            this.isLoading = false;
          }
        );
      }
    });
  }

  goToEditProduct(product: Product) {
    const navigationExtras: NavigationExtras = {
      state: {
        product: product,
      },
    };
    this._router.navigate(['/edit-product'], navigationExtras);
  }

  productToDelete(product: Product) {
    this._productToDelete = product;
    this._productToDeleteName = product.product_name;
    this.isModalVisible = true;
  }

  deleteProduct(){
    this._apiService.deleteProduct(this._productToDelete).subscribe(()=>{
      this.loadproduct()
    });
    this.hideModal();
  }

  hideModal() {
    this.isModalVisible = false;
  }
}
