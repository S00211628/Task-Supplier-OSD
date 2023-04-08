import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';
import { Order, smallSupplierInfo } from 'src/app/models/supplier';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() order: Order;
  @Output() close = new EventEmitter();

  Suppliers: smallSupplierInfo[] = [{ shop_name: '', SupplierID: '' }];

  constructor(private _apiGatewayService: ApiGatewayService) {}

  ngOnInit(): void {
    this._apiGatewayService.getAllSuppliers().subscribe((data) => {
      let result = JSON.parse(data);

      result.forEach((s) => {
        this.Suppliers.push({
          shop_name: s.shop_name,
          SupplierID: s.SupplierID,
        });
      });

      this.order.OrderItems.forEach((item) => {
        this.Suppliers.forEach((supplier) => {
          if (item.SupplierID == supplier.SupplierID) {
            item.SupplierShopName = supplier.shop_name;
          }
        });
      });
    });
  }

  closeModal() {
    this.close.emit();
  }
}
