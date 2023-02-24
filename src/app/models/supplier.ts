

export interface Supplier {
  shop_name: string;
  SupplierID: string;
  shop_address: string;
  shop_type: string;
  Email: string;
  isClicked?:boolean,
  Products: Product[];
}

export interface Product {
  product_desc: string;
  SupplierID: string;
  product_price: number;
  product_name: string;
  product_id: string;
}

export interface Customer{
  CustomerID:string;
  Email:string;
  Products:Product[];
}
