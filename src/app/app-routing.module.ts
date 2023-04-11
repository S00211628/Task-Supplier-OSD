import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './Components/admin/admin-main/admin-main.component';
import { AdminComponent } from './Components/admin/admin/admin.component';
import { BasketComponent } from './Components/Customer/basket/basket.component';
import { ConfirmForgotPasswordComponent } from './Components/Auth/confirm-forgot-password/confirm-forgot-password.component';
import { DeliveryViewComponent } from './Components/Customer/delivery-view/delivery-view.component';
import { EditProductComponent } from './Components/Supplier/edit-product/edit-product.component';
import { EditSupplierComponent } from './Components/Supplier/edit-supplier/edit-supplier.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { ListProductsMainComponent } from './Components/Supplier/list-products-main/list-products-main.component';
import { ListProductsComponent } from './Components/Supplier/list-products/list-products.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { NewProductComponent } from './Components/Supplier/new-product/new-product.component';
import { ShopConfigurationComponent } from './Components/Supplier/shop-configuration/shop-configuration.component';
import { ShopProfileSetupComponent } from './Components/Supplier/shop-profile-configuration/shop-profile-setup.component';
import { SignUpComponent } from './Components/Auth/sign-up/sign-up.component';
import { VerifyEmailComponent } from './Components/Auth/verify-email/verify-email.component';
import { IsLoggedInGuard } from './Guards/is-logged-in.guard';
import { ShopConfigurationGuard } from './Guards/shop-configuration-guard.guard';
import { SuppliersGuard } from './Guards/suppliers-guard.guard';
import { ProfileComponent } from './Components/Customer/profile/profile.component';
import { MyOrdersComponent } from './Components/Customer/my-orders/my-orders.component';
import { MyDetailsComponent } from './Components/Customer/my-details/my-details.component';
import { MyBalanceComponent } from './Components/Customer/my-balance/my-balance.component';
import { CheckoutComponent } from './Components/Customer/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'confirm-forgot-password/:email',
    component: ConfirmForgotPasswordComponent,
  },
  {
    path: 'shop-configuration',
    component: ShopConfigurationComponent,
    canActivate: [IsLoggedInGuard, ],
  },
  {
    path: 'edit-supplier-profile',
    component: ShopProfileSetupComponent,
    canActivate: [IsLoggedInGuard, ],
  },
  {
    path: 'suppliers',
    component: DeliveryViewComponent,
    canActivate: [IsLoggedInGuard, ],
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path: 'my-details',
    component: MyDetailsComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path: 'my-balance',
    component: MyBalanceComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path: 'suppliers/:supplierId',
    component: DeliveryViewComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'list-products',
    component: ListProductsMainComponent,
    canActivate: [IsLoggedInGuard, ],
  },
  {
    path: 'suppliers/:supplierId/edit-supplier',
    component: EditSupplierComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'edit-product',
    component: EditProductComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
