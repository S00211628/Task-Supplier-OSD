import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AWSAuthService } from '../Services/awsauth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private _authService: AWSAuthService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authService.isLoggedIn().pipe(
      map((loggedIn) => {
        if (loggedIn) {
          console.log("Is logged in : ", loggedIn);
          return true;
        } else {
          this._router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
