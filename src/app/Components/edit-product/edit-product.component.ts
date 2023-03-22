import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Product } from 'src/app/models/supplier';
import { SuppliersService } from 'src/app/Services/suppliers.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  constructor(
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {}

 
  pForm!: FormGroup;
  product:Product;

  ngOnInit(): void {

    this.product = history.state.product;

    console.log(this.product);

    this.pForm = this._formBuilder.group({
      ProductName: [this.product.product_name, [Validators.required, Validators.minLength(3)]],
      Description: [this.product.product_desc, [Validators.required, Validators.minLength(3)]],
      Price: [this.product.product_price, [Validators.required]],
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

  updateProduct(Name: string, Description: string, Price: string) {



  }
    
}
