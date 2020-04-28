import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {ConfirmModalComponent} from './confirm/confirm.modal';
import {ConfirmPaymentComponent} from './payment-sent/payment-sent.modal';
import {CancelPledgeComponent} from './cancel-pledge/cancel-pledge.modal';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.modal';
import {ReactiveFormsModule} from '@angular/forms';
import {MydealDetailComponent} from './mydeal-detail/mydeal-detail.component';
import {ActivityDetailComponent} from './activity-detail/activity-detail.component';
import {AvatarModule} from 'ngx-avatar';
import {VerifyModalComponent} from './verify/verify.modal';
import {ContractPayInfoComponent} from "./contract-pay-info/contract-pay-info.component";
import {BankInfoComponent} from "./bank-info/bank-info.component";

@NgModule({
  declarations: [
    ConfirmModalComponent, ConfirmPaymentComponent, CancelPledgeComponent, ForgotPasswordComponent, MydealDetailComponent, ActivityDetailComponent, VerifyModalComponent, ContractPayInfoComponent, BankInfoComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    AvatarModule
  ],
  exports: [
    ConfirmModalComponent, ConfirmPaymentComponent, CancelPledgeComponent, ForgotPasswordComponent, MydealDetailComponent, ActivityDetailComponent, VerifyModalComponent, ContractPayInfoComponent, BankInfoComponent
  ],
  entryComponents: [ConfirmModalComponent, ConfirmPaymentComponent, CancelPledgeComponent, ForgotPasswordComponent, MydealDetailComponent, ActivityDetailComponent, VerifyModalComponent, ContractPayInfoComponent, BankInfoComponent]
})

export class ModalsModule {
}
