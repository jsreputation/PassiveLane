import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InvestorTypePageRoutingModule} from './investor-type-routing.module';

import {InvestorTypePage} from './investor-type.page';
import {ComponentsModule} from 'src/app/widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvestorTypePageRoutingModule,
    ComponentsModule
  ],
  declarations: [InvestorTypePage]
})
export class InvestorTypePageModule {
}
