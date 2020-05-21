import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { SignUpPage } from './sign-up.page';
import {ModalsModule} from "../../../widgets/modals/modals.module";
import {ComponentsModule} from "../../../widgets/components/component.module";
import {ConfirmModalComponent} from "../../../widgets/modals/confirm/confirm.modal";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ModalsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [SignUpPage],
  entryComponents: [ConfirmModalComponent]
})
export class SignUpPageModule {}
