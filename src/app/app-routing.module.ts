import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './Components/admin/admin-main/admin-main.component';
import { AdminComponent } from './Components/admin/admin/admin.component';
import { BasketComponent } from './Components/basket/basket.component';
import { ConfirmForgotPasswordComponent } from './Components/confirm-forgot-password/confirm-forgot-password.component';
import { DeliveryViewComponent } from './Components/delivery-view/delivery-view.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { EditSupplierComponent } from './Components/edit-supplier/edit-supplier.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ListProductsMainComponent } from './Components/list-products-main/list-products-main.component';
import { ListProductsComponent } from './Components/list-products/list-products.component';
import { LoginComponent } from './Components/login/login.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { NewSupplierComponent } from './Components/new-supplier/new-supplier.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { ShopConfigurationComponent } from './Components/shop-configuration/shop-configuration.component';
import { ShopProfileSetupComponent } from './Components/shop-profile-configuration/shop-profile-setup.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './Components/verify-email/verify-email.component';
import { IsLoggedInGuard } from './Guards/is-logged-in.guard';
import { ShopConfigurationGuard } from './Guards/shop-configuration-guard.guard';
import { SuppliersGuard } from './Guards/suppliers-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'confirm-forgot-password/:email', component: ConfirmForgotPasswordComponent },
  {
    path: 'new-supplier',
    component: NewSupplierComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'shop-configuration',
    component: ShopConfigurationComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'edit-supplier-profile',
    component: ShopProfileSetupComponent,
    canActivate:[IsLoggedInGuard, ShopConfigurationGuard]
  },
  {
    path: 'suppliers',
    component: DeliveryViewComponent,
    canActivate: [IsLoggedInGuard, SuppliersGuard],
  },
  {
    path:'basket',
    component:BasketComponent,
    canActivate:[IsLoggedInGuard, SuppliersGuard]
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
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'suppliers/:supplierId/edit-supplier',
    component: EditSupplierComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'suppliers/:supplierId/products/:productId/edit-product',
    component: EditProductComponent,
    canActivate: [IsLoggedInGuard, ShopConfigurationGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path:'admin',
    component:AdminComponent,
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
