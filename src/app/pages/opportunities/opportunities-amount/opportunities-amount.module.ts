import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunitiesAmountPageRoutingModule } from './opportunities-amount-routing.module';

import { OpportunitiesAmountPage } from './opportunities-amount.page';
import {ComponentsModule} from '../../../widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpportunitiesAmountPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OpportunitiesAmountPage]
})
export class OpportunitiesAmountPageModule {}
