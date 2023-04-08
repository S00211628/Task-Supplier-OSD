import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss'],
})
export class CheckoutConfirmationComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }
}
