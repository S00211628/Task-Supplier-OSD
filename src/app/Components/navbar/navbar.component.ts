import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';
import { AWSAuthService } from 'src/app/Services/awsauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private router: Router,
    private _authService:AWSAuthService
  ) {}

  ngOnInit(): void {}

  logout(){
    this._authService.logout();
  }
}
