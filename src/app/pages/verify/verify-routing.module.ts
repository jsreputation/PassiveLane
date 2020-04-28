import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerifyComponent} from './home/verify.component';
import {SmsVerificationComponent} from './sms-verification/sms-verification.component';
import {BankVerificationComponent} from './bank-verification/bank-verification.component';


const routes: Routes = [
  { path: '', component: VerifyComponent },
  { path: 'sms-verification', component: SmsVerificationComponent },
  { path: 'bank-verification', component: BankVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyPageRoutingModule {}
