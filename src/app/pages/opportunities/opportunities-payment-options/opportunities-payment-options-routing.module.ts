import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesPaymentOptionsPage } from './opportunities-payment-options.page';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesPaymentOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesPaymentOptionsPageRoutingModule {}
