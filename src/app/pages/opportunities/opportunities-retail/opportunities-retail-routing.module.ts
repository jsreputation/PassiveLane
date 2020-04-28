import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesRetailPage } from './opportunities-retail.page';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesRetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesRetailPageRoutingModule {}
