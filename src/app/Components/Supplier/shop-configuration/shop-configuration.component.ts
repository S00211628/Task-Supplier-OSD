import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-shop-configuration',
  templateUrl: './shop-configuration.component.html',
  styleUrls: ['./shop-configuration.component.scss'],
})
export class ShopConfigurationComponent implements OnInit {
  displayStyle = 'none';
  shopName?: string;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private _router: Router,
    private _authService: AWSAuthService,
    private observer: BreakpointObserver
  ) {}

  // userAttributes:

  //todo Modal popup should probably be its own component. :?

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((attributes) => {
      this.shopName = attributes.shop_name;
      if (this.shopName == undefined) {
        this.displayStyle = 'block';
      } else {
        console.log(this.shopName);
      }
    });
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  navigateToShopConfiguration() {
    this._router.navigateByUrl('/edit-supplier-profile');
    this.closePopup();
  }

  closePopup() {
    this.displayStyle = 'none';
  }
  
}
