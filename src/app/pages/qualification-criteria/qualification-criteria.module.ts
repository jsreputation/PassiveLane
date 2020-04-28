import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {QualificationCriteriaPageRoutingModule} from './qualification-criteria-routing.module';

import {QualificationCriteriaPage} from './qualification-criteria.page';
import {ComponentsModule} from 'src/app/widgets/components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualificationCriteriaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [QualificationCriteriaPage]
})
export class QualificationCriteriaPageModule {
}
