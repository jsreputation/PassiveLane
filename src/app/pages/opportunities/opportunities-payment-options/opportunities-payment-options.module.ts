import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunitiesPaymentOptionsPageRoutingModule } from './opportunities-payment-options-routing.module';

import { OpportunitiesPaymentOptionsPage } from './opportunities-payment-options.page';
import {ComponentsModule} from '../../../widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpportunitiesPaymentOptionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OpportunitiesPaymentOptionsPage]
})
export class OpportunitiesPaymentOptionsPageModule {}
