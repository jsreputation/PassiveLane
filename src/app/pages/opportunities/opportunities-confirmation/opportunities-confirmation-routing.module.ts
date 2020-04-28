import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpportunitiesConfirmationPage } from './opportunities-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpportunitiesConfirmationPageRoutingModule {}
