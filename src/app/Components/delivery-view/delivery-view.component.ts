import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product, Supplier } from 'src/app/models/supplier';
import { Suppliers } from 'src/app/models/suppliers.models';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { SuppliersService } from 'src/app/Services/suppliers.service';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss'],
})
export class DeliveryViewComponent implements OnInit {
  Suppliers?: Suppliers[];
  // Products?: Product[];
  ProductsLoaded: Boolean = true;
  SelectedSupplierID!: string;
  SelectedProductID!: string;

  suppliers: Supplier[] = [];
  products: Product[] = [];
  customerEmail: string;
  customerBasket: Product[] = [];
  quantity = 0;
  supplierSelected: boolean = false;
  selectedQuantity: number;

  constructor(
    private _supplierService: SuppliersService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _aipService: ApiGatewayService,
    private _authService: AWSAuthService
  ) {}

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((data) => {
      this.customerEmail = data['email'];
      this._aipService
        .getCustomer(this.customerEmail)
        .subscribe((data: any) => {
          this.customerBasket = data['Basket'];
          console.log('Customers basket : ', this.customerBasket);
        });
    });

    this._aipService.getAllSuppliers().subscribe(
      (data) => {
        const supplierArray = JSON.parse(data);
        this.suppliers = supplierArray.map((supplierObj: any) => {
          return {
            shop_name: supplierObj.shop_name,
            SupplierID: supplierObj.SupplierID,
            shop_address: supplierObj.shop_address,
            shop_type: supplierObj.shop_type,
            Email: supplierObj.Email,
            Products: supplierObj.Products,
          };
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onQuantityChanged(quantity: number) {
    this.selectedQuantity = quantity;
  }

  getProductsBySupplierEmail(supplier: Supplier) {
    this.products = supplier['Products'];
    this.products.forEach((product) => {
      product['product_quantity'] = 0;
      product['product_in_basket'] = false;
      this.customerBasket.forEach((basketProduct) => {
        if (product.product_id === basketProduct.product_id) {
          product['product_quantity'] = basketProduct.product_quantity;
          product['product_in_basket'] = true;
        }
      });
    });
  }

  onSupplierClicked(supplier: Supplier) {
    supplier.isClicked = !supplier.isClicked;
  }

  addProductToBasket(product: Product, quantity: number) {
    console.log(quantity);
    product.product_quantity = quantity;

    console.log('Product Added ', product);

    this._authService.getUserAttributes().subscribe((data) => {
      this.customerEmail = data['email'];
      this._aipService.addProductToBasket(this.customerEmail, product);
    });
  }

 

  isSupplierSelected() {
    this.supplierSelected = true;
    console.log(this.supplierSelected);
  }
}
