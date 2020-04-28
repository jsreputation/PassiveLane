import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailVerifyPageRoutingModule } from './mail-verify-routing.module';

import { MailVerifyPage } from './mail-verify.page';
import {ComponentsModule} from "../../widgets/components/component.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailVerifyPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [MailVerifyPage]
})
export class MailVerifyPageModule {}
