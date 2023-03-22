import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from "@angular/cdk/layout";
import { ApiGatewayService } from 'src/app/Services/api-gateway.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUserRole: string;
  supplierShopName:string;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private router: Router,
    private _authService: AWSAuthService,
    private observer: BreakpointObserver,
    private _apiService:ApiGatewayService
  ) {}

  ngOnInit(): void {
    this._authService.getUserAttributes().subscribe((attribute) => {
      if (attribute['custom:role'] === 'customer') {
        this.currentUserRole = 'customer';
      } else {
        this.currentUserRole = 'supplier';
        this.supplierShopName = attribute['shop_name']
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



  logout() {
    this._authService.logout();
  }

  editProfile() {
    this.router.navigate(['/edit-supplier-profile']);
  }
}
