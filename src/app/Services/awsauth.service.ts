import { Injectable } from '@angular/core';
import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AWSAuthService {
  poolData = {
    UserPoolId: environment.cognito.userPoolId,
    ClientId: environment.cognito.userPoolWebClientId,
    region: environment.cognito.region,
  };

  userPool = new CognitoUserPool(this.poolData);

  ROLE_GROUP_MAPPING = {
    supplier: 'Suppliers',
    customer: 'Customers',
  };

  constructor(private _router: Router) {
    AWS.config.update({
      accessKeyId: environment.aws.AccessKey,
      secretAccessKey: environment.aws.SecretAccessKey,
      region: environment.cognito.region,
    });
  }

  // Define a function to add a user to a group
  addUserToGroup(cognitoUser: CognitoUser, groupName: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const params = {
        UserPoolId: this.poolData.UserPoolId,
        GroupName: groupName,
        Username: cognitoUser.getUsername(),
      };
      const cognitoIdentityServiceProvider =
        new CognitoIdentityServiceProvider();
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

  public signIn(email: string, password: string) {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        this._router.navigate(['/suppliers']);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
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
          resolve();
        }
      });
    });
  }

  public async isAdmin() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (!cognitoUser) {
      return false;
    }
    const attributes = await this.getUserAttributes(cognitoUser);
    const attribute = attributes.find(
      (attr) => attr.getName() === 'custom:role'
    );
    return attribute?.getValue() === 'admin';
  }

  public async isSupplier() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (!cognitoUser) {
      return false;
    }
    const attributes = await this.getUserAttributes(cognitoUser);
    const attribute = attributes.find(
      (attr) => attr.getName() === 'custom:role'
    );
    return attribute?.getValue() === 'supplier';
  }

  public async isCustomer() {
    const cognitoUser = this.userPool.getCurrentUser();
    if (!cognitoUser) {
      return false;
    }
    const attributes = await this.getUserAttributes(cognitoUser);
    const attribute = attributes.find(
      (attr) => attr.getName() === 'custom:role'
    );
    return attribute?.getValue() === 'customer';
  }

  public async getUserAttributes(
    cognitoUser: CognitoUser
  ): Promise<CognitoUserAttribute[]> {
    return new Promise((resolve, reject) => {
      cognitoUser.getUserAttributes((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result || []);
        }
      });
    });
  }
}
