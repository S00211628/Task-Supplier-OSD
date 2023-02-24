import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Components
import { DeliveryViewComponent } from './Components/delivery-view/delivery-view.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { EditSupplierComponent } from './Components/edit-supplier/edit-supplier.component';
import { NewSupplierComponent } from './Components/new-supplier/new-supplier.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { MessageModalComponent } from './Components/modal/message-modal/message-modal.component';
import { ShopConfigurationComponent } from './Components/shop-configuration/shop-configuration.component';
import { ConfirmForgotPasswordComponent } from './Components/confirm-forgot-password/confirm-forgot-password.component';
import { ShopProfileSetupComponent } from './Components/shop-profile-configuration/shop-profile-setup.component';
import { SalesByMonthComponent } from './Components/sales-by-month/sales-by-month.component';
import { SalesByCategoryComponent } from './Components/sales-by-category/sales-by-category.component';
import { RecentTransactionsComponent } from './Components/recent-transactions/recent-transactions.component';
import { TopThreeProductsComponent } from './Components/top-three-products/top-three-products.component';
import { ShopConfigurationMainComponent } from './Components/shop-configuration-main/shop-configuration-main.component';
import { TopWidgetsComponent } from './Components/top-widgets/top-widgets.component';
import { VerifyEmailComponent } from './Components/verify-email/verify-email.component';
import { BasketComponent } from "./Components/basket/basket.component";
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
// End of Angular Material

// Misc
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartModule } from 'angular-highcharts';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    DeliveryViewComponent,
    EditProductComponent,
    EditSupplierComponent,
    NewSupplierComponent,
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
    MatToolbarModule,
    FontAwesomeModule,
    ChartModule,
    MatDividerModule,
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
