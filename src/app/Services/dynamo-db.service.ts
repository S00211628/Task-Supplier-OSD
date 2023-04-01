import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { DynamoDB } from "aws-sdk";
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier';
import { ApiGatewayService } from './api-gateway.service';
import { AWSAuthService } from './awsauth.service';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  dynamoDB = new AWS.DynamoDB({
    region: environment.aws.region,
    accessKeyId: environment.aws.accessKeyId,
    secretAccessKey: environment.aws.secretAccessKey,
  });
  supplierEmail: string;

  constructor(
    private _authService: AWSAuthService,
    private _router: Router,
    private _apiService: ApiGatewayService
  ) {}

  // Get the Suppliers info.
  async getShopInfoByEmail(): Promise<Supplier> {
    try {
      // retrieve supplier email first
      const attributes = await this._authService
        .getUserAttributes()
        .toPromise();

      if (attributes.email != undefined) {
        this.supplierEmail = attributes.email;
        console.log('Supplier email', this.supplierEmail);
      } else {
        console.log('No Supplier Email Found');
        return null;
      }

      // query the database using the supplier email
      const response = await this._apiService.getSupplier(this.supplierEmail).toPromise();

      return response as Supplier;
    
  } catch (error) {
    console.error('Failed to get shop info from database:', error);
    throw error;
  }
}

  // Update Supplier and Cognito

  async updateShopAndCognito(
    shopName: string,
    shopAddress: string,
    shopType: string
  ) {
    try {
      await this._apiService.putSupplier(this.supplierEmail, shopName, shopAddress, shopType)

      await this._authService.updateShopName(shopName);

      console.log('Shop and Cognito updated successfully');
    } catch (error) {
      console.error('Failed to update shop and Cognito:', error);
      throw error;
    }
  }

 

  async deleteSupplier(): Promise<void> {
    try {
      const supplierEmail = await this._authService
        .getUserAttributes()
        .subscribe((atr) => {
          return atr;
        });
      console.log(supplierEmail);

     
      await this._authService.deleteUser(this.supplierEmail);
      await this._apiService.deleteSupplier(this.supplierEmail);


      console.log(`Supplier ${this.supplierEmail} deleted successfully`);
    } catch (error) {
      console.error('Failed to delete supplier:', error);
      throw error;
    }
  }
}
