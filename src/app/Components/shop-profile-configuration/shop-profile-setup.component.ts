import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AWSAuthService } from 'src/app/Services/awsauth.service';
import { DynamoDBService } from 'src/app/Services/dynamo-db.service';

@Component({
  selector: 'app-shop-profile-setup',
  templateUrl: './shop-profile-setup.component.html',
  styleUrls: ['./shop-profile-setup.component.scss']
})
export class ShopProfileSetupComponent implements OnInit {


  supplierProfileForm:FormGroup;

  supplierShopName:string;
  supplierAddress:string;
  supplierShopType:string;

  constructor(private _authService:AWSAuthService, private _dynamoDBService:DynamoDBService, private _formBuilder:FormBuilder) { 


   

     this.supplierProfileForm = this._formBuilder.group({
       shopName: ['' || this.supplierShopName, Validators.required],
       address: ['', Validators.required],
       shopType: ['', Validators.required],
     });
  }

  ngOnInit(): void {

    this._dynamoDBService.getShopInfoByEmail().then((SupplierInfo) => {

      console.log(SupplierInfo);

      if(SupplierInfo){
        this.shopName.setValue(SupplierInfo.shop_name.S || "")
        this.address.setValue(SupplierInfo.shop_address.S || "")
        this.shopType.setValue(SupplierInfo.shop_type.S || "")
      }
    })

   
  }

  get shopName(){
    return this.supplierProfileForm.get('shopName')
  }

  get address(){
    return this.supplierProfileForm.get('address')
  }

  get shopType(){
    return this.supplierProfileForm.get('shopType')
  }





   async onSubmit() {


    try {
      // Update the supplier information in DynamoDB and Cognito

      console.log(this.shopName, this.address, this.shopType);
      await this._dynamoDBService.updateShopAndCognito(
        this.shopName.value,
        this.address.value,
        this.shopType.value
      );
      console.log('Shop and Cognito updated successfully');
    } catch (error) {
      console.error('Failed to update shop and Cognito:', error);
      // Handle the error here
    }
}

}
