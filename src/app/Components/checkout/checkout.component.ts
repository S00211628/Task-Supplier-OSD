import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StripeService } from 'src/app/Services/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  stripeTestKey = environment.stripe.secretKey;
  cardDetailsFilledOut = false;
  invalidError: any;
  cardCaptureReady = 0;
  paymentMethod: any;
  stripeToken: any;
  stripeSource: any;

  constructor(private _stripeService: StripeService, private router: Router) {}

  ngOnInit(): void {}

  setPaymentMethod(event: any) {
    this.paymentMethod = event.value;
  }

  setStripeToken(event: any) {
    this.stripeToken = event.value;
  }

  setStripeSource(event: any) {
    this.stripeSource = event.value;
  }

  onStripeError(error: any) {
    console.error('Stripe error:', error);
  }

  pay() {
    // if (this.paymentMethod && this.paymentMethod.id) {
    //   // Use the payment method to create a payment intent
    //   const paymentIntentData = {
    //     payment_method_types: ['card'],
    //     amount: 1000, // Replace with the total order cost from the basket
    //     currency: 'usd',
    //     payment_method: this.paymentMethod.id,
    //     confirm: true,
    //   };
    //   this.stripeService
    //     .createPaymentIntent(paymentIntentData)
    //     .subscribe((result) => {
    //       console.log('Payment intent created:', result);
    //       // Confirm the payment intent
    //       this.stripeService
    //         .confirmPaymentIntent(result.client_secret)
    //         .subscribe((confirmResult) => {
    //           console.log('Payment confirmed:', confirmResult);
    //           // Redirect to a success page
    //           this.router.navigate(['/success']);
    //         });
    //     });
    // } else {
    //   console.error('No payment method selected');
    // }
  }
}
