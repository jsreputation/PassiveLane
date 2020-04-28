import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesAmountPage } from './opportunities-amount.page';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesAmountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesAmountPageRoutingModule {}
