import { Component, Input, OnInit } from '@angular/core';
import { Order, Product } from 'src/app/models/supplier';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss'],
})
export class RecentTransactionsComponent implements OnInit {
  @Input() LastThreeOrders: Order[];

  ProductsInOrder: Product[] = [
    {
      product_desc: '',
      SupplierID: '',
      product_price: 0,
      product_name: '',
      product_id: '',
      product_stock: '',
      product_quantity: 0,
      product_in_basket: false,
      isEditing: false,
      SupplierShopName: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    console.log('here');

    if (this.LastThreeOrders) {
      this.LastThreeOrders.sort((a, b) => {
        const dateA = new Date(a.OrderDate);
        const dateB = new Date(b.OrderDate);
        return dateB.getTime() - dateA.getTime();
      });

      console.log('Last Three Orders ', this.LastThreeOrders);
      this.ProductsInOrder = this.LastThreeOrders[0].OrderItems;
    } else {
      console.log('Last Three Orders not available yet');
    }
  }

  
}
