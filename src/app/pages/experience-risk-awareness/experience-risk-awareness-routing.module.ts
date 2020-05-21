import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ExperienceRiskAwarenessPage} from './experience-risk-awareness.page';

const routes: Routes = [
  {
    path: '',
    component: ExperienceRiskAwarenessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExperienceRiskAwarenessPageRoutingModule {
}
