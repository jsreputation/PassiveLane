import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SignInPageRoutingModule} from './sign-in-routing.module';

import {SignInPage} from './sign-in.page';
import {ComponentsModule} from '../../../widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {
}
