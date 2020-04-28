import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AgreeToTermsPageRoutingModule} from './agree-to-terms-routing.module';

import {AgreeToTermsPage} from './agree-to-terms.page';
import {ComponentsModule} from 'src/app/widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgreeToTermsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgreeToTermsPage]
})
export class AgreeToTermsPageModule {
}
