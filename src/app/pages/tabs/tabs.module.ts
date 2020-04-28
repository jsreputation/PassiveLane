import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {TabsPageRoutingModule} from './tabs-routing.module';

import {ComponentsModule} from 'src/app/widgets/components/component.module';

import {TabsPage} from './tabs.page';
import {InvestPage} from './invest/home/invest.page';
import {InvestMmTelecomRetailPage} from './invest/invest-mm-telecom-retail/invest-mm-telecom-retail.page';
import {InvestmentAmountPage} from './invest/investment-amount/investment-amount.page';
import {PaymentOptionsPage} from './invest/payment-options/payment-options.page';
import {InvestmentConfirmaitonPage} from './invest/investment-confirmaiton/investment-confirmaiton.page';
import {YourInvestmentPage} from './invest/your-investment/your-investment.page';
import {PayPage} from './pay/home/pay.page';
import {ModalsModule} from 'src/app/widgets/modals/modals.module';
import {ActivityPage} from './activity/activity.page';
import {MyDealPage} from './my-deal/home/my-deal.page';
import {CashOutPage} from './cache-out/cache-out.page';
import {MmTelecomRetailPage} from './my-deal/mm-telecom-retail/mm-telecom-retail.page';
import {ProfilePage} from './profile/profile.page';
import {PaymentPage} from './pay/payment/payment.page';
import {AvatarModule} from 'ngx-avatar';
import { DynamicHostDirective } from './dynamic-host/dynamic-host.directive';
import {DynamicHostSlotComponent} from './dynamic-host/dynamic-host-slot/dynamic-host-slot.component';
import { AddressConfirmPage } from './invest/address-confirm/address-confirm.page';
import { CertificatePage } from './my-deal/certificate/certificate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ComponentsModule,
    ModalsModule,
    ReactiveFormsModule,
    AvatarModule,

  ],
  declarations: [
    TabsPage,

    // my deal
    MyDealPage,
    MmTelecomRetailPage,
    CertificatePage,
    // invest
    InvestPage,
    InvestMmTelecomRetailPage,
    InvestmentAmountPage,
    PaymentOptionsPage,
    InvestmentConfirmaitonPage,
    YourInvestmentPage,
    AddressConfirmPage,
    // activity
    ActivityPage,

    // pay
    PayPage,
    PaymentPage,
    // cache out
    CashOutPage,

    //  profile page
    ProfilePage,

    DynamicHostDirective,
    DynamicHostSlotComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TabsPageModule {
}
