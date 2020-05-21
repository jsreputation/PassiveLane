import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AgreeToTermsPage} from './agree-to-terms.page';

const routes: Routes = [
  {
    path: '',
    component: AgreeToTermsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreeToTermsPageRoutingModule {
}
