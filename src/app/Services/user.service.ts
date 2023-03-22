import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { AWSAuthService } from './awsauth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userAttributes$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private _authService: AWSAuthService) {
    this._authService.getUserAttributes().subscribe(
      (attributes) => this.userAttributes$.next(attributes),
      (error) => console.error(error)
    );
  }

  getUserRole(): Observable<string> {
    return this.userAttributes$.pipe(
      filter((attributes) => attributes !== null),
      map((attributes) => attributes['custom:role'])
    );
  }
}
