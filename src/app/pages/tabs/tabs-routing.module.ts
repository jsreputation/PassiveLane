import { AuthGuard } from './../../guards/auth.guard';
import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {TabsPage} from './tabs.page';
import {InvestMmTelecomRetailPage} from './invest/invest-mm-telecom-retail/invest-mm-telecom-retail.page';
import {PaymentOptionsPage} from './invest/payment-options/payment-options.page';
import {InvestmentConfirmaitonPage} from './invest/investment-confirmaiton/investment-confirmaiton.page';
import {YourInvestmentPage} from './invest/your-investment/your-investment.page';
import {InvestmentAmountPage} from './invest/investment-amount/investment-amount.page';
import {InvestPage} from './invest/home/invest.page';
import {PayPage} from './pay/home/pay.page';
import {ActivityPage} from './activity/activity.page';
import {CashOutPage} from './cache-out/cache-out.page';
import {MyDealPage} from './my-deal/home/my-deal.page';
import {MmTelecomRetailPage} from './my-deal/mm-telecom-retail/mm-telecom-retail.page';
import {ProfilePage} from './profile/profile.page';
import {PaymentPage} from './pay/payment/payment.page';
import { AddressConfirmPage } from './invest/address-confirm/address-confirm.page';
import { CertificatePage } from './my-deal/certificate/certificate.page';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: TabsPage,
    children: [
      {
        path: 'my-deal',
        children: [
          {
            path: '',
            component: MyDealPage
          },
          {
            path: 'mm-telecom-retail',
            component: MmTelecomRetailPage
          },
          {
            path: 'mm-telecom-retail/certificate',
            component: CertificatePage
          },
        ]
      },
      {
        path: 'invest',
        children: [
          {
            path: '',
            component: InvestPage,
          },
          {
            path: 'invest-mm-telecom-retail',
            component: InvestMmTelecomRetailPage,
          },
          {
            path: 'investment-amount',
            component: InvestmentAmountPage
          },
          {
            path: 'payment-options',
            component: PaymentOptionsPage
          },
          {
            path: 'investment-confirmaiton',
            component: InvestmentConfirmaitonPage
          },
          {
            path: 'your-investment',
            component: YourInvestmentPage
          },
          {
            path: 'address-confirm',
            component: AddressConfirmPage
          }
        ]
      },
      {
        path: 'activity',
        children: [
          {
            path: '',
            component: ActivityPage
          }
        ]
      },
      {
        path: 'pay',
        children: [
          {
            path: '',
            component: PayPage
          },
          {
            path: 'payment',
            component: PaymentPage
          },
        ]
      },
      {
        path: 'cache-out',
        children: [
          {
            path: '',
            component: CashOutPage
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            component: ProfilePage
          }
        ]
      },
      {
        path: '',
        redirectTo: 'my-deal',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'my-deal',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // RouterModule.forRoot(routes,
    //     {
    //       preloadingStrategy: PreloadAllModules,
    //       enableTracing: false,
    //       onSameUrlNavigation: 'reload',
    //       scrollPositionRestoration: 'top',
    //     })
  ],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
