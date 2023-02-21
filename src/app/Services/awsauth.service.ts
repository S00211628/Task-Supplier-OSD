import { Injectable } from '@angular/core';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import CognitoIdentityServiceProvider from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as AWS from 'aws-sdk'


import { Router } from '@angular/router';
import {Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AWSAuthService {
  private userPool: CognitoUserPool;
  private currentUser: CognitoUser;
  private cognitoIdentityServiceProvider: CognitoIdentityServiceProvider;

  ROLE_GROUP_MAPPING = {
    supplier: 'Suppliers',
    customer: 'Customers',
  };

  AuthenticatedCognitoUser: CognitoUser;

  constructor(private _router: Router) {
    const poolData = {
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
      region: environment.cognito.region,
    };

    this.cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
      region: environment.aws.Region,
      accessKeyId: environment.aws.AccessKey,
      secretAccessKey: environment.aws.SecretAccessKey
    })

    this.userPool = new CognitoUserPool(poolData);
    this.currentUser = this.userPool.getCurrentUser();
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
    this.AuthenticatedCognitoUser = new CognitoUser(userData);

    return from(
      new Promise<boolean>((resolve, reject) => {
        this.AuthenticatedCognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session) => {
            this.AuthenticatedCognitoUser.getUserAttributes(
              (error, attributes) => {
                if (error) {
                  reject(error);
                } else {
                  const attributeMap = {};

                  attributes.forEach((attribute) => {
                    attributeMap[attribute.getName()] = attribute.getValue();
                  });
                  if (attributeMap['custom:role'] === 'supplier') {
                    this._router.navigate(['/shop-configuration']);
                  } else if (attributeMap['custom:role'] === 'customer') {
                    this._router.navigate(['/suppliers']);
                  }

                  resolve(true);
                }
              }
            );
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

                attributeMap['shop_name'] = attributeMap['custom:shop_name'];

                resolve(attributeMap);
              }
            });
          }
        });
      })
    );
  }

  // Logout the user
  logout() {
    const currentUser: CognitoUser = this.userPool.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
      this._router.navigate(['/login']);
    }
  }

  // Check if there is a user currently logged in.
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

  // Update Supplier Profile Information Section

  async getAuthenticatedUser(): Promise<CognitoUser> {
    if (this.currentUser) {
      return new Promise<CognitoUser>((resolve, reject) => {
        this.currentUser.getSession((err, session) => {
          if (err) {
            console.error('Failed to get user session:', err);
            reject(err);
          } else if (!session.isValid()) {
            console.error('User session is invalid');
            reject(new Error('User session is invalid'));
          } else {
            const cognitoUser = new CognitoUser({
              Username: this.currentUser.getUsername(),
              Pool: this.userPool,
            });
            cognitoUser.setSignInUserSession(session);
            resolve(cognitoUser);
          }
        });
      });
    } else {
      console.error('User is not logged in');
      throw new Error('User is not logged in');
    }
  }


  // Update shop_name attribute
  async updateShopName(shopName: string): Promise<void> {
    try {
      const authenticatedUser = await this.getAuthenticatedUser();
      if (!authenticatedUser) {
        throw new Error('User is not authenticated');
      }

      const attributeList: CognitoUserAttribute[] = [
        new CognitoUserAttribute({ Name: 'custom:shop_name', Value: shopName }),
      ];

      await new Promise<void>((resolve, reject) => {
        authenticatedUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            console.error('Failed to update user attributes:', err);
            reject(err);
          } else {
            console.log('Successfully updated user attributes:', result);
            resolve();
          }
        });
      });
    } catch (error) {
      console.error('Failed to update shop name:', error);
      throw error;
    }
  }

  // Delete user and sign them out
  async deleteUser(email: string): Promise<void> {
    const params = {
      UserPoolId: environment.cognito.userPoolId,
      Username: email,
    };
    await this.cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
    this.logout();
  }

}


  


