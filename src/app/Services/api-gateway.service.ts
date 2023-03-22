import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product, Supplier } from '../models/supplier';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayService {
  readonly supplierRootURL;
  readonly customerRootURL;
  supplier: Supplier;

  constructor(private _http: HttpClient, private _router: Router) {
    this.supplierRootURL =
      'https://oiqystpb83.execute-api.eu-west-1.amazonaws.com/dev/suppliers/';
    this.customerRootURL =
      'https://oiqystpb83.execute-api.eu-west-1.amazonaws.com/dev/customers/';
  }

  getSupplierByID(SupplierID: string) {
    const url = this.supplierRootURL + 'id/' + SupplierID;
    return this._http.get<Supplier>(url);
  }

  getSupplier(email: string) {
    const url = this.supplierRootURL + 'email/' + email;
    return this._http.get(url);
  }

  getCustomer(email: string) {
    const url = this.customerRootURL + email;
    return this._http.get(url);
  }

  getAllSuppliers(): Observable<string> {
    const url = this.supplierRootURL;
    return this._http.get(url).pipe(
      map((response: any) => response.body),
      catchError((error: any) => throwError(error))
    );
  }

  addProductToBasket(email: string, product: any) {
    const url = this.customerRootURL + 'add-basket';
    const body = {
      email: email,
      product: product,
    };
    return this._http.post(url, body);
  }

  removeProductFromBasket(CustomerEmail: string, ProductID: string) {
    const url =
      this.customerRootURL + CustomerEmail + '?ProductID=' + ProductID;
    return this._http.delete(url);
  }

  putSupplier(
    email: string,
    shopName: string,
    shopAddress: string,
    ShopType: string
  ) {
    const url = this.supplierRootURL + 'email/' + email; // Assume this works.
    const body = {
      shop_name: shopName,
      shop_address: shopAddress,
      shop_type: ShopType,
    };
    return this._http.put(url, body).subscribe((data) => {
      console.log('Supplier Updated : ', data);
      this._router.navigate(['/shop-configuration']);
    });
  }

  putProduct(email: string, products: any[]) {
    const url = this.supplierRootURL + 'add-product';
    const body = {
      products: products,
      email: email,
    };
    return this._http.post(url, body).subscribe((data) => {
      this._router.navigate(['/shop-configuration']);
    });
  }

  editProduct(product: Product) {
    const {
      product_id,
      SupplierID,
      product_name,
      product_price,
      product_desc,
    } = product;
    const url = this.supplierRootURL + 'edit-product';
    const body = {
      product_id: product_id,
      SupplierID: SupplierID,
      product_name: product_name,
      product_price: product_price,
      product_desc: product_desc,
    };

    return this._http.post(url, body).subscribe(() => {
      this._router.navigate(['/list-products']);
    });
  }

  deleteProduct(product: Product) {
    const url = this.supplierRootURL + 'delete-product';

     const options = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json',
       }),
       body: {
         product_id: product.product_id,
         SupplierID: product.SupplierID,
       },
     };

    
    return this._http.delete(url, options)
  }

  deleteSupplier(email: string) {
    const url = this.supplierRootURL + 'email/' + email; // Assume this works.
    return this._http.delete(url).subscribe((data) => {
      console.log('Supplier Delete : ', data);
    });
  }
}
