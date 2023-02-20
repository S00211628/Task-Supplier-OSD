import { Injectable } from '@angular/core';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Router } from '@angular/router';
import {Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AWSAuthService {
  private userPool: CognitoUserPool;

  ROLE_GROUP_MAPPING = {
    supplier: 'Suppliers',
    customer: 'Customers',
  };

  constructor(private _router: Router) {
    const poolData = {
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
      region: environment.cognito.region,
    };
    this.userPool = new CognitoUserPool(poolData);
  }

  // Define a function to add a user to a group
  addUserToGroup(cognitoUser: CognitoUser, groupName: string): Promise<void> {
    console.log('add user to group');
    return new Promise<void>((resolve, reject) => {
      const params = {
        UserPoolId: this.userPool.getUserPoolId(),
        GroupName: groupName,
        Username: cognitoUser.getUsername(),
      };
      const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider(
        {
          accessKeyId: environment.aws.AccessKey,
          secretAccessKey: environment.aws.SecretAccessKey,
          region: environment.cognito.region,
        }
      );
      cognitoIdentityServiceProvider.adminAddUserToGroup(params, (err) => {
        if (err) {
          console.error('Failed to add user to group:', err);
          reject(err);
        } else {
          this._router.navigate(['verify-email'], {
            queryParams: { email: cognitoUser.getUsername() },
          });
        }
      });
    });
  }

  // Modify the signUp() function to add the user to a group based on their role
  signUp(email: string, password: string, role: string): Promise<void> {
    const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'custom:role', Value: role }),
    ];

    return new Promise<void>((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        attributeList,
        [],
        (err, result) => {
          if (err) {
            console.error('Failed to sign up user:', err);
            reject(err);
          } else {
            const cognitoUser = result.user;
            const groupName = this.ROLE_GROUP_MAPPING[role];
            this.addUserToGroup(cognitoUser, groupName)
              .then(resolve)
              .catch(reject);
          }
        }
      );
    });
  }

  login(username: string, password: string): Observable<boolean> {
    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = { Username: username, Pool: this.userPool };
    const cognitoUser = new CognitoUser(userData);

    return from(
      new Promise<boolean>((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            cognitoUser.getUserAttributes((error, attributes) => {
              if (error) {
                reject(error);
              } else {
                const attributeMap = {};

                attributes.forEach((attribute) => {
                  attributeMap[attribute.getName()] = attribute.getValue();
                });

                console.log('Attribute Map: ', attributeMap);

                if (attributeMap['custom:role'] === 'supplier') {
                  this._router.navigate(['/shop-configuration']);
                } else if (attributeMap['custom:role'] === 'customer') {
                  this._router.navigate(['/suppliers']);
                }

                resolve(true);
              }
            });
          },
          onFailure: (error) => {
            reject(error);
          },
        });
      })
    );
  }

  getUserAttributes(): Observable<any> {
    const currentUser: CognitoUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return from(Promise.resolve({}));
    }

    return from(
      new Promise<any>((resolve, reject) => {
        currentUser.getSession((error, session) => {
          if (error) {
            reject(error);
          } else {
            currentUser.getUserAttributes((error, attributes) => {
              if (error) {
                reject(error);
              } else {
                const attributeMap = {};

                attributes.forEach((attribute) => {
                  attributeMap[attribute.getName()] = attribute.getValue();
                });

                resolve(attributeMap);
              }
            });
          }
        });
      })
    );
  }

  logout() {
    const currentUser: CognitoUser = this.userPool.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
      this._router.navigate(['/login']);
    }
  }

  isLoggedIn(): Observable<boolean> {
    const currentUser: CognitoUser = this.userPool.getCurrentUser();

    if (currentUser === null) {
      return from(Promise.resolve(false));
    }

    return from(
      new Promise<boolean>((resolve, reject) => {
        currentUser.getSession((error, session) => {
          if (error) {
            reject(error);
          } else if (!session.isValid()) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      })
    );
  }

  // Confirm User registration.
  public confirmRegistration(
    email: string,
    confirmationCode: string
  ): Promise<void> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Promise<void>((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('Successfully confirmed registration');
          this._router.navigate(['/login']);
          resolve();
        }
      });
    });
  }

  // Forgot Password
  forgotPassword(email: string): Promise<void> {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });
    return new Promise<void>((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          console.log('Password reset instructions sent');
          this._router.navigate(['/confirm-forgot-password', email]);
          resolve();
        },
        onFailure: (err) => {
          console.log(err);
          reject(err);
        },
      });
    });
  }

  // Confirm Forgot Password
  confirmForgotPassword(
    email: string,
    password: string,
    code: string
  ): Promise<void> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };


    console.log("Code : ",code);

    const cognitoUser = new CognitoUser(userData);

    return new Promise<void>((resolve, reject) => {
      cognitoUser.confirmPassword(code, password, {
        onSuccess: () => {
          console.log('Successfully confirmed new password.');
          this._router.navigate(['/login']);
          resolve();
        },
        onFailure: (err) => {
          console.error('Failed to confirm new password.', err);
          reject(err);
        },
      });
    });
  }
}
