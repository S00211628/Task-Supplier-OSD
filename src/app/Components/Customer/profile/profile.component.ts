import { Component, ViewChild, OnInit, ViewContainerRef } from '@angular/core';
import { MyDetailsComponent } from './../my-details/my-details.component';
import { MyBalanceComponent } from './../my-balance/my-balance.component';
import { MyOrdersComponent } from './../my-orders/my-orders.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  dynamicComponentContainer: ViewContainerRef;
  selectedComponent: any = MyDetailsComponent;

  MyDetailsComponent = MyDetailsComponent;
  MyBalanceComponent = MyBalanceComponent;
  MyOrdersComponent = MyOrdersComponent;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (this.selectedComponent) {
      const componentRef = this.dynamicComponentContainer.createComponent(
        this.selectedComponent
      );
    }
  }
}
