import { Injectable } from '@angular/core';
// import { DynamoDB } from "aws-sdk";
import * as AWS from 'aws-sdk';
import { environment } from 'src/environments/environment';
import { AWSAuthService } from './awsauth.service';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  dynamoDB = new AWS.DynamoDB({
    region: environment.aws.Region,
    accessKeyId: environment.aws.AccessKey,
    secretAccessKey: environment.aws.SecretAccessKey,
  });
  supplierEmail: string;

  constructor(private _authService: AWSAuthService) {}

  // Get the Suppliers info.
  async getShopInfoByEmail(): Promise<any> {
    try {
      // retrieve supplier email first
      const attributes = await this._authService
        .getUserAttributes()
        .toPromise();
      if (attributes.email != undefined) {
        this.supplierEmail = attributes.email;
        console.log(this.supplierEmail);
      } else {
        console.log('No Supplier Email Found');
        return null;
      }

      // query the database using the supplier email
      const params = {
        TableName: 'Supplier',
        IndexName: 'Email-index',
        KeyConditionExpression: 'Email = :Email',
        ExpressionAttributeValues: {
          ':Email': { S: this.supplierEmail },
        },
        ProjectionExpression: 'shop_name, shop_address, shop_type',
      };
      const { Items } = await this.dynamoDB.query(params).promise();
      return Items[0];
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
      const updatedAttributes = await this.updateSupplier(
        shopName,
        shopType,
        shopAddress
      );

      await this._authService
        .updateShopName(shopName)

      console.log('Shop and Cognito updated successfully');
      console.log('Updated attributes:', updatedAttributes);
    } catch (error) {
      console.error('Failed to update shop and Cognito:', error);
      throw error;
    }
  }

  // Update the suppliers information.
  async updateSupplier(shopName, shopType, shopAddress) {
    try {
      // Check if the supplier exists in the database
      const params = {
        TableName: 'Supplier',
        IndexName: 'Email-index',
        KeyConditionExpression: 'Email = :Email',
        ExpressionAttributeValues: {
          ':Email': {
            S: this.supplierEmail,
          },
        },
      };

      const { Items } = await this.dynamoDB.query(params).promise();

      if (Items.length === 0) {
        throw new Error(`Supplier with email ${this.supplierEmail} not found`);
      }

      // Update the supplier's data
      const updateParams = {
        TableName: 'Supplier',
        Key: {
          SupplierID: {
            S: Items[0]['SupplierID'].S,
          },
        },
        UpdateExpression:
          'SET #shopName = :shopName, #shopType = :shopType, #shopAddress = :shopAddress',
        ExpressionAttributeNames: {
          '#shopName': 'shop_name',
          '#shopType': 'shop_type',
          '#shopAddress': 'shop_address',
        },
        ExpressionAttributeValues: {
          ':shopName': {
            S: shopName,
          },
          ':shopType': {
            S: shopType,
          },
          ':shopAddress': {
            S: shopAddress,
          },
        },
        ReturnValues: 'ALL_NEW',
      };

      const { Attributes } = await this.dynamoDB
        .updateItem(updateParams)
        .promise();

      return Attributes;
    } catch (error) {
      console.error('Failed to update supplier:', error);
      throw error;
    }
  }
}
