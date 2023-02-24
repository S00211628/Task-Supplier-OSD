import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Params, Router } from '@angular/router';
import { SuppliersService } from 'src/app/Services/suppliers.service';
import { WebRequestService } from 'src/app/Services/web-request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  constructor(
    private _webService: WebRequestService,
    private _supplierService: SuppliersService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _apiService:ApiGatewayService,
    private _authService:AWSAuthService
  ) {}

  pForm!: FormGroup;

  supplierId!: string;
  products:any[] = [];
  Email:string;

  ngOnInit(): void {
    this._activatedRouter.params.subscribe((params: Params) => {
      this.supplierId = params['supplierId'];
    });

    this.pForm = this._formBuilder.group({
      ProductName: ['', [Validators.required, Validators.minLength(3)]],
      Description: ['', [Validators.required, Validators.minLength(3)]],
      Price: ['', [Validators.required]],
    });
  }

  // crateProduct(title: string, description: string, price: string) {
  //   this._supplierService
  //     .createProduct(title, this.supplierId, description, price)
  //     .subscribe((newProduct: any) => {
  //       this._router.navigate(['../'], { relativeTo: this._activatedRouter });
  //     });
  // }

  addProduct(){
    this.products.push({
      product_name: this.ProductName.value,
      product_desc: this.Description.value,
      product_price: this.Price.value
    })
this._authService.getUserAttributes().subscribe((attributes) => {
  console.log('Attributes : ', attributes);
  this.Email = attributes.email;
  console.log(JSON.stringify(this.Email) + JSON.stringify(this.products));
  this._apiService.putProduct(this.Email, this.products);
});


  }

  get ProductName() {
    return this.pForm.get('ProductName');
  }

  get Description() {
    return this.pForm.get('Description');
  }

  get Price() {
    return this.pForm.get('Price');
  }
}
