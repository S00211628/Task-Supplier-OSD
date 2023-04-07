import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  selectedDeliveryMethod: string;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this._formBuilder.group({
      firstName: new FormControl( '', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl ('', [Validators.pattern(/^[0-9]{10}$/)]),
      emailAddress: new FormControl ('', [Validators.required, Validators.email]),
      streetAddress: new FormControl ('', [Validators.required]),
      aptSuite: new FormControl ('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      county: new FormControl ('', [Validators.required]),
      eirCode: new FormControl(
        '',
        [Validators.pattern(
          /^([AC-FHKNPRTV-Y]\d{2}|D6W)\s?[0-9AC-FHKNPRTV-Y]{4}$/i
        ),
      ]),
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      const selectedDeliveryMethod = this.checkoutForm.get('deliveryMethod').value;
      console.log(selectedDeliveryMethod)
      console.log(this.checkoutForm.value);
    }
  }
}
