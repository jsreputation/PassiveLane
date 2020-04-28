import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpportunitiesYourInvestmentPageRoutingModule } from './opportunities-your-investment-routing.module';

import { OpportunitiesYourInvestmentPage } from './opportunities-your-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpportunitiesYourInvestmentPageRoutingModule
  ],
  declarations: [OpportunitiesYourInvestmentPage]
})
export class OpportunitiesYourInvestmentPageModule {}
