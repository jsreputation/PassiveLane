import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QualificationCriteriaPage} from './qualification-criteria.page';

const routes: Routes = [
  {
    path: '',
    component: QualificationCriteriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualificationCriteriaPageRoutingModule {
}
