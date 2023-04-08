import { Component, EventEmitter, OnInit,Output  } from '@angular/core';

@Component({
  selector: 'app-checkout-failed',
  templateUrl: './checkout-failed.component.html',
  styleUrls: ['./checkout-failed.component.scss'],
})
export class CheckoutFailedComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.close.emit();
  }
}
