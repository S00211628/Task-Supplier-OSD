

export interface Supplier {
  shop_name: string;
  SupplierID: string;
  shop_address: string;
  shop_type: string;
  Email: string;
  isClicked?:boolean,
  Products: Product[];
  Orders:Order[];
}

export interface smallSupplierInfo{
  shop_name: string;
  SupplierID: string;
}


export interface Product {
  product_desc: string;
  SupplierID: string;
  product_price: number;
  product_name: string;
  product_id: string;
  product_stock?:string;
  product_quantity?:number;
  product_in_basket?:boolean;
  isEditing?:boolean;
  SupplierShopName?:string;
}

export interface Customer{
  CustomerID:string;
  Email:string;
  Products:Product[];
  dateOfBirth:string;
  firstName:string;
  lastName:string;
  phoneNumber:string;
  balance:number;
}

export interface Order{
  OrderID?:string;
  customer:Customer;
  OrderDate:string;
  OrderStatus:string;
  OrderTotal:number;
  OrderItems:Product[];
  deliveryAddress:Address;
}


export interface Address{
  streetAddress:string;
  aptSuite:string;
  city:string;
  county:string;
  eirCode:string;
}
