import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ExperienceRiskAwarenessPageRoutingModule} from './experience-risk-awareness-routing.module';

import {ExperienceRiskAwarenessPage} from './experience-risk-awareness.page';
import {ComponentsModule} from 'src/app/widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperienceRiskAwarenessPageRoutingModule,
    ComponentsModule

  ],
  declarations: [ExperienceRiskAwarenessPage]
})
export class ExperienceRiskAwarenessPageModule {
}
