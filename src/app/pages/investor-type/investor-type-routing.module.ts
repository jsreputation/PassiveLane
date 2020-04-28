import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {InvestorTypePage} from './investor-type.page';

const routes: Routes = [
  {
    path: '',
    component: InvestorTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorTypePageRoutingModule {
}
