import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPageRoutingModule } from './verify-routing.module';

import {ComponentsModule} from '../../widgets/components/component.module';
import {VerifyComponent} from './home/verify.component';
import {SmsVerificationComponent} from './sms-verification/sms-verification.component';
import {BankVerificationComponent} from './bank-verification/bank-verification.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VerifyPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [
      VerifyComponent, SmsVerificationComponent, BankVerificationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class VerifyPageModule {}
