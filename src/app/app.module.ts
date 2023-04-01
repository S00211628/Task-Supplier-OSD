import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';


// Components
import { DeliveryViewComponent } from './Components/Customer/delivery-view/delivery-view.component';
import { EditProductComponent } from './Components/Supplier/edit-product/edit-product.component';
import { EditSupplierComponent } from './Components/Supplier/edit-supplier/edit-supplier.component';
import { NewProductComponent } from './Components/Supplier/new-product/new-product.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { SignUpComponent } from "./Components/Auth/sign-up/sign-up.component";
import { ConfirmationComponent } from './Components/Auth/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './Components/Auth/forgot-password/forgot-password.component';
import { NavbarComponent } from './Components/Common/navbar/navbar.component';
import { MessageModalComponent } from './Components/Common/message-modal/message-modal.component';
import { ShopConfigurationComponent } from './Components/Supplier/shop-configuration/shop-configuration.component';
import { ConfirmForgotPasswordComponent } from './Components/Auth/confirm-forgot-password/confirm-forgot-password.component';
import { ShopProfileSetupComponent } from './Components/Supplier/shop-profile-configuration/shop-profile-setup.component';
import { SalesByMonthComponent } from './Components/Supplier/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './Components/Supplier/sales-by-category/sales-by-category.component';
import { RecentTransactionsComponent } from './Components/Supplier/recent-transactions/recent-transactions.component';
import { TopThreeProductsComponent } from './Components/Supplier/top-three-products/top-three-products.component';
import { ShopConfigurationMainComponent } from './Components/Supplier/shop-configuration-main/shop-configuration-main.component';
import { TopWidgetsComponent } from './Components/Supplier/top-widgets/top-widgets.component';
import { VerifyEmailComponent } from './Components/Auth/verify-email/verify-email.component';
import { BasketComponent } from "./Components/Customer/basket/basket.component";
import { ProfileComponent } from "./Components/Customer/profile/profile.component";
// End of Components.

// HTTP 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// End of HTTP

// Angular Material
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import { matDrawerAnimations, MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule} from '@angular/material/list';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// End of Angular Material

// Misc
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { MatDividerModule } from '@angular/material/divider';
import { QuantitySelectorComponent } from './Components/Common/quantity-selector/quantity-selector.component';
import { SearchComponent } from './Components/Common/search/search.component';
import { AdminMainComponent } from "./Components/admin/admin-main/admin-main.component";
import { AdminSidenavComponent } from './Components/admin/admin-sidenav/admin-sidenav.component';
import { AdminComponent } from './Components/admin/admin/admin.component';
import { ListProductsComponent } from './Components/Supplier/list-products/list-products.component';
import { ListProductsMainComponent } from './Components/Supplier/list-products-main/list-products-main.component';
import { ProductFilterPipe } from './models//ProductFilterPipe';
import { SearchProductComponent } from './Components/Common/search-product/search-product.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductFilterPipe,
    DeliveryViewComponent,
    EditProductComponent,
    EditSupplierComponent,
    NewProductComponent,
    LoginComponent,
    SignUpComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    NavbarComponent,
    ProfileComponent,
    MessageModalComponent,
    VerifyEmailComponent,
    ShopConfigurationComponent,
    ConfirmForgotPasswordComponent,
    ShopProfileSetupComponent,
    SalesByMonthComponent,
    SalesByCategoryComponent,
    RecentTransactionsComponent,
    TopThreeProductsComponent,
    ShopConfigurationMainComponent,
    TopWidgetsComponent,
    BasketComponent,
    QuantitySelectorComponent,
    SearchComponent,
    AdminMainComponent,
    AdminSidenavComponent,
    AdminComponent,
    ListProductsComponent,
    ListProductsMainComponent,
    SearchProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FontAwesomeModule,
    ChartModule,
    MatDividerModule,
    SharedModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthHttpInterceptor,
    //   multi: true,
    // },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
