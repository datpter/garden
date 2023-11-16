import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms'; // Import form module
import {MatTabsModule} from '@angular/material/tabs';

import {TokenInterceptor} from "./token.interceptor";
import { CommonModule } from '@angular/common';


import { CartComponent } from './cart/cart.component';
import { ChechoutComponent } from './chechout/chechout.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';







const routes: Routes = [
  {path:'',component:HomeComponent,title:'Home'},
  {path:'about',component:AboutComponent,title:'About'},
  {path:'shop',component:ShopComponent,title:'Shop'},
  {path:'contact',component:ContactComponent,title:'Contact'},
   {path:'login',component:LoginComponent,title:'Login'},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'product/:id',component:ProductComponent,title:'Product'},
  {path:'cart',component:CartComponent,title:'Cart'},
  {path:'checkout',component:ChechoutComponent,title:'Checkout'},
  {path:'account',component:AccountComponent,title:'Account'},




];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    ProductComponent,

    CartComponent,
    ChechoutComponent,
    AccountComponent,
    FooterComponent,
    NavComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CarouselModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule ,
    MatTabsModule,
    CommonModule,


  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
