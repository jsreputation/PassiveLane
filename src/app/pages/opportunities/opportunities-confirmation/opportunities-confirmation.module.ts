import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunitiesConfirmationPageRoutingModule } from './opportunities-confirmation-routing.module';

import { OpportunitiesConfirmationPage } from './opportunities-confirmation.page';
import {ComponentsModule} from '../../../widgets/components/component.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OpportunitiesConfirmationPageRoutingModule,
        ComponentsModule,
        ReactiveFormsModule
    ],
  declarations: [OpportunitiesConfirmationPage]
})
export class OpportunitiesConfirmationPageModule {}
