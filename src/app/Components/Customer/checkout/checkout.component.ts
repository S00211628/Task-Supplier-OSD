import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { double } from 'aws-sdk/clients/lightsail';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { Product } from 'src/app/models/product.models';
import { Customer, Order } from 'src/app/models/supplier';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _apiGateway: ApiGatewayService,
  ) {}

  deliveryOptions: string[] = ['standard', 'fast'];

  tax: number = 5;
  OrderFinalTotal: number = 0.0;
  OrderProductsCost: number = 0;
  shippingCost: number = 5.0;
  SupplierIDs:string[] = [];

  isSuccess: boolean = false;
  paymentTried: boolean = false;

  OrderProducts: Product[] = [];
  Customer: Customer = {
    firstName: '',
    balance: 0,
    lastName: '',
    phoneNumber: '',
    Email: '',
    CustomerID: '',
    Products: [],
    dateOfBirth: '',
  };
  Order: Order = {
    OrderID: '',
    customer: null,
    OrderDate: '',
    OrderStatus: '',
    OrderTotal: 0,
    OrderItems: [],
    deliveryAddress: {
      streetAddress: '',
      aptSuite: '',
      city: '',
      county: '',
      eirCode: '',
    },
  };

  checkoutForm: FormGroup;

  ngOnInit(): void {
    // Get the customers basket, Customer Object and Total price from the Basket Component.

    this._activatedRoute.queryParams.subscribe((params) => {
      console.log('data params : ', params);

      this.Order.OrderItems = JSON.parse(params['basketItems']);
      this.Customer = JSON.parse(params['Customer']);
      this.OrderProductsCost = parseInt(params['totalPrice']);
      this.Customer = JSON.parse(params['Customer']);

      console.log('customer : ', this.Customer.CustomerID);

      this.calculateTotal();

      this.checkoutForm = new FormGroup({
        firstName: new FormControl(this.Customer.firstName, [
          Validators.required,
        ]),
        lastName: new FormControl(this.Customer.lastName, [
          Validators.required,
        ]),
        phoneNumber: new FormControl(this.Customer.phoneNumber, [
          Validators.pattern(/^[0-9]{10}$/),
        ]),
        emailAddress: new FormControl(this.Customer.Email, [
          Validators.required,
          Validators.email,
        ]),
        streetAddress: new FormControl('', [Validators.required]),
        aptSuite: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        county: new FormControl('', [Validators.required]),
        eirCode: new FormControl('', [
          Validators.pattern(
            /^([AC-FHKNPRTV-Y]\d{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i
          ),
        ]),
        deliveryMethod: new FormControl('standard', [Validators.required]),
      });
    });


    

    // Get all the Supplier ID from the basket.

    for (let i = 0; i < this.Order.OrderItems.length; i++) {
      let product = this.Order.OrderItems[i];
      if (this.SupplierIDs.indexOf(product.SupplierID) == -1) {
        this.SupplierIDs.push(product.SupplierID);
      }
        
      }
    console.log('supplier ids : ', this.SupplierIDs);
      
    }


  get f() {
    return this.checkoutForm.controls;
  }

  get firstName() {
    return this.checkoutForm.get('firstName');
  }

  get lastName() {
    return this.checkoutForm.get('lastName');
  }

  get phoneNumber() {
    return this.checkoutForm.get('phoneNumber');
  }

  get emailAddress() {
    return this.checkoutForm.get('emailAddress');
  }

  get streetAddress() {
    return this.checkoutForm.get('streetAddress');
  }

  get aptSuite() {
    return this.checkoutForm.get('aptSuite');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get county() {
    return this.checkoutForm.get('county');
  }

  get eirCode() {
    return this.checkoutForm.get('eirCode');
  }

  get deliveryMethod() {
    return this.checkoutForm.get('deliveryMethod');
  }

  updateShippingCost(event) {
    console.log(event);

    if (event.value == 'standard') {
      this.shippingCost = 5;
    } else if (event.value == 'fast') {
      this.shippingCost = 10;
    }

    this.calculateTotal();
  }

  calculateTotal() {
    this.OrderFinalTotal =
      this.OrderProductsCost + this.tax + this.shippingCost;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.paymentTried = true;
    }

    this.Order.deliveryAddress.streetAddress =
      this.checkoutForm.value.streetAddress;
    this.Order.deliveryAddress.aptSuite = this.checkoutForm.value.aptSuite;
    this.Order.deliveryAddress.city = this.checkoutForm.value.city;
    this.Order.deliveryAddress.county = this.checkoutForm.value.county;
    this.Order.deliveryAddress.eirCode = this.checkoutForm.value.eirCode;
    this.Order.customer = this.Customer;
    this.Order.OrderTotal = this.OrderFinalTotal;
    this.Order.OrderDate = new Date().toDateString();
    this.Order.OrderStatus = 'Pending';

    if (this.Customer.balance >= this.OrderFinalTotal) {

      let newBalance = this.Customer.balance - this.OrderFinalTotal;


      console.log('customerID : ', this.Customer.CustomerID);
      console.log('newBalance : ', newBalance);
      console.log('Order : ', this.Order);

      // Update the customers balance and add the order in the database.
      this._apiGateway.addOrderToCustomerTable(this.Customer.CustomerID, newBalance, this.Order).subscribe((data) => {
        console.log('data : ', data);


        this._apiGateway.clearCustomerBasket(this.Customer.CustomerID).subscribe((data) => {
          console.log('data : ', data);
        });

        this._apiGateway.addOrderToSupplierTable( this.Order).subscribe((data) => {
          this.isSuccess = true;
        });


      });
    } else if(this.Customer.balance < this.OrderFinalTotal) {
      this.isSuccess = false;
    }



    console.log('Order : ', this.Order);
  }


  CloseModal(){
    console.log("here in closeModal");
    this.paymentTried = false;
    this.isSuccess = false;
  }
}
