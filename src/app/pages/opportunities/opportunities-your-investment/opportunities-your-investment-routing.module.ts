import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesYourInvestmentPage } from './opportunities-your-investment.page';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesYourInvestmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesYourInvestmentPageRoutingModule {}
