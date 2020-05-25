import { TabsPageModule } from './pages/tabs/tabs.module';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {fadeAnimation} from './widgets/animations/animation';
import {ModalsModule} from './widgets/modals/modals.module';

import {Camera} from '@ionic-native/camera/ngx';
import { BranchIo } from '@ionic-native/branch-io/ngx';
import {HttpClientModule} from '@angular/common/http';

import {IonicStorageModule} from '@ionic/storage';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth/auth.service';
import { DatePipe, CommonModule } from '@angular/common';
import {FCM} from '@ionic-native/fcm/ngx';
import {ComponentsModule} from './widgets/components/component.module';
import {VerifyPageModule} from './pages/verify/verify.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    // InvestMmTelecomRetailPage,
    // YourInvestmentPage,
    // PaymentOptionsPage,
    // InvestmentConfirmaitonPage,
    // AddressConfirmPage,
    // InvestmentAmountPage
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: fadeAnimation,
      swipeBackEnabled: false,
      mode: 'ios',
    }),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    VerifyPageModule,
    TabsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AuthService,
    Camera,
    DatePipe,
    FCM,
    BranchIo,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {
}
