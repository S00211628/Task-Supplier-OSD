import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ShopConfigurationGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._userService.getUserRole().pipe(
      map((role) => {
        if (role === 'supplier') {
          return true;
        } else {
          this._router.navigate(['/suppliers']);
          return false;
        }
      })
    );
  }
}
