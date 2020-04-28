import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunitiesRetailPageRoutingModule } from './opportunities-retail-routing.module';

import { OpportunitiesRetailPage } from './opportunities-retail.page';
import {ComponentsModule} from '../../../widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpportunitiesRetailPageRoutingModule,
    ComponentsModule
  ],
  declarations: [OpportunitiesRetailPage]
})
export class OpportunitiesRetailPageModule {}
