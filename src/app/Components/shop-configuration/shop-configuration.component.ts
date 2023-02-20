import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-shop-configuration',
  templateUrl: './shop-configuration.component.html',
  styleUrls: ['./shop-configuration.component.scss'],
})
export class ShopConfigurationComponent implements OnInit {
  displayStyle = 'none';
  shopName?:string;

  constructor(private _router: Router, private _authService: AWSAuthService) {}

  // userAttributes:

  //todo Modal popup should probably be its own component. :?

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((attributes) => {
     this.shopName = attributes.shop_name;
      if (this.shopName == undefined) {
        this.displayStyle = 'block'
      } else {
        console.log(this.shopName);
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
