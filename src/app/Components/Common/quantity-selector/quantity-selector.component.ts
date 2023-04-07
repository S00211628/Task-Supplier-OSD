import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss'],
})
export class QuantitySelectorComponent{
  @Input() quantity: number;
  @Input() isProductInBasket:boolean;
  @Output() quantityChanged = new EventEmitter<number>();

  increment() {
    this.quantity++;
    this.quantityChanged.emit(this.quantity);
  }

  decrement() {
    this.quantity--;
    this.quantityChanged.emit(this.quantity);
  }

  onQuantityChanged(event: MatSelectChange) {
    console.log(this.isProductInBasket);
    this.quantityChanged.emit(event.value);
  }
}
