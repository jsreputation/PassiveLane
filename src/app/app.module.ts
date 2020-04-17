import {NgModule} from '@angular/core';
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
import {HttpClientModule} from '@angular/common/http';

import {IonicStorageModule} from '@ionic/storage';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth/auth.service';
import {DatePipe} from '@angular/common';
import {FCM} from '@ionic-native/fcm/ngx';
import {ComponentsModule} from './widgets/components/component.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {VerifyPageModule} from './pages/verify/verify.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      navAnimation: fadeAnimation,
      swipeBackEnabled: false,
      mode: 'ios',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    VerifyPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AuthService,
    Camera,
    DatePipe,
    FCM,
    SocialSharing,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
