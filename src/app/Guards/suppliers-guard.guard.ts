import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AWSAuthService } from '../Services/awsauth.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SuppliersGuard implements CanActivate {
  constructor(private _authService: AWSAuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._authService.getUserAttributes().pipe(
      map((attributeMap) => {
        const role = attributeMap['custom:role'];

        if (role === 'customer') {
          return true;
        } else {
          this.router.navigate(['/shop-configuration']);
          return false;
        }
      })
    );
  }
}
