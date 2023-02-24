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

  constructor(
    private _supplierService: SuppliersService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _aipService: ApiGatewayService,
    private _authService:AWSAuthService
  ) {}

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params) => {
      const supplierId = params['supplierId'];
      if (supplierId) {
        this._supplierService.getProducts(supplierId).subscribe((products) => {
          // this.Products = products;
          // this.ProductsLoaded = this.Products.length > 0;
          // this.SelectedSupplierID = supplierId;
        });
      } else {
        // If no supplierId is available, use a default supplierId or display a message to the user
        this.SelectedSupplierID = '0'; // Replace with your default supplierId or logic for displaying a message
      }
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

  getProductsBySupplierId(email: string) {
    this._aipService.getSupplier(email).subscribe((data) => {
      console.log('Data : ', data['Products']);
      const supplier: Supplier = data[0];
      this.products = data['Products'];
    });
  }

  onSupplierClicked(supplier: Supplier) {
    supplier.isClicked = !supplier.isClicked;
  }

  addProductToBasket(product:Product){

   this._authService.getUserAttributes().subscribe((data) =>{
    const userEmail = data['email'];
    this._aipService.addProductToBasket(userEmail, product)
   })

  }

  // onAddedToBasket(product: Product) {
  //   // We want to set the product to added to basket
  //   this._supplierService.addedToBasket(product).subscribe(() => {
  //     // The product has been added successfully
  //     product.addedToBasket = !product.addedToBasket;
  //   });
  // }

  // DeleteItem(product: Product) {
  //   // we want to send the product to be deleted to the webservice
  //   this._supplierService.deleteProduct(product).subscribe((res) => {
  //     console.log(res);
  //   });
  //   window.location.reload();
  // }

  // async DeleteSupplier() {
  //   this._supplierService
  //     .deleteSupplier(this.SelectedSupplierID)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });

  //   this._supplierService
  //     .deleteAllProducts(this.SelectedSupplierID)
  //     .subscribe((res: any) => {
  //       console.log(res);
  //     });

  //   this._supplierService.getSuppliers().subscribe((suppliers) => {
  //     window.location.replace('/suppliers');
  //   });
  // }

  // EditProduct(product: Product) {
  //   this.SelectedProductID = product._id;

  //   this._router.navigate([
  //     `/suppliers/${this.SelectedSupplierID}/products/${this.SelectedProductID}/edit-product`,
  //   ]);
  // }

  // editSupplier(supplier: Suppliers) {
  //   this._router.navigate([
  //     `/suppliers/${this.SelectedSupplierID}/edit-supplier`,
  //   ]);
  // }
}
