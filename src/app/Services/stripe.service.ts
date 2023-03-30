import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  // private apiUrl = environment.apiUrl;

  // constructor(private http: HttpClient) {}

  // createPaymentIntent(amount: number): Observable<any> {
  //   const body = {
  //     amount: amount,
  //     currency: 'usd',
  //   };

  //   return this.http.post(`${this.apiUrl}/payment-intent`, body);
  // }

  // confirmPaymentIntent(
  //   paymentIntentId: string,
  //   paymentMethodId: string
  // ): Observable<any> {
  //   const body = {
  //     paymentIntentId: paymentIntentId,
  //     paymentMethodId: paymentMethodId,
  //   };

  //   return this.http.post(`${this.apiUrl}/confirm-payment`, body);
  // }

  // createSetupIntent(): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/setup-intent`, {});
  // }

  // confirmSetupIntent(
  //   setupIntentId: string,
  //   paymentMethodId: string
  // ): Observable<any> {
  //   const body = {
  //     setupIntentId: setupIntentId,
  //     paymentMethodId: paymentMethodId,
  //   };

  //   return this.http.post(`${this.apiUrl}/confirm-setup`, body);
  // }
}
