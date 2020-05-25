import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import { AntiGuard } from './antiguards/anti.guard';

import { YourInvestmentPage } from './pages/tabs/invest/your-investment/your-investment.page';
import { PaymentOptionsPage } from './pages/tabs/invest/payment-options/payment-options.page';
import { InvestmentConfirmaitonPage } from './pages/tabs/invest/investment-confirmaiton/investment-confirmaiton.page';
import { AddressConfirmPage } from './pages/tabs/invest/address-confirm/address-confirm.page';
import { InvestmentAmountPage } from './pages/tabs/invest/investment-amount/investment-amount.page';
import { InvestMmTelecomRetailPage } from './pages/tabs/invest/invest-mm-telecom-retail/invest-mm-telecom-retail.page';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {
    path: 'welcome', canActivate: [AntiGuard],
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'sign-in', canActivate: [AntiGuard],
    loadChildren: () => import('./pages/auth/sign-in/sign-in.module').then(m => m.SignInPageModule),
    // canActivate: []
  },
  {
    path: 'sign-up', canActivate: [AntiGuard],
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  // invester type pages
      {
        path: 'mail-verify', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/mail-verify/mail-verify.module').then( m => m.MailVerifyPageModule)
      },
      {
        path: 'verify',
        loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
      },
      {
        path: 'investor-type', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/investor-type/investor-type.module').then(m => m.InvestorTypePageModule)
      },
      {
        path: 'qualification-criteria', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/qualification-criteria/qualification-criteria.module').then(m => m.QualificationCriteriaPageModule)
      },
      {
        path: 'experience-risk-awareness', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/experience-risk-awareness/experience-risk-awareness.module').then(m => m.ExperienceRiskAwarenessPageModule)
      },
      {
        path: 'agree-to-terms', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/agree-to-terms/agree-to-terms.module').then(m => m.AgreeToTermsPageModule)
      },
  // opportunities pages
      {
        path: 'opportunities', canActivate: [AuthGuard],
        loadChildren: () => import('./pages/opportunities/home/home.module').then( m => m.HomePageModule)
      },
      // {
      //   path: 'opportunities-retail',
      //   loadChildren: () => import('./pages/opportunities/opportunities-retail/opportunities-retail.module').then( m => m.OpportunitiesRetailPageModule)
      // },
      // {
      //   path: 'opportunities-amount',
      //   loadChildren: () => import('./pages/opportunities/opportunities-amount/opportunities-amount.module').then( m => m.OpportunitiesAmountPageModule)
      // },
      // {
      //   path: 'opportunities-confirmation',
      //   loadChildren: () => import('./pages/opportunities/opportunities-confirmation/opportunities-confirmation.module').then( m => m.OpportunitiesConfirmationPageModule)
      // },
      // {
      //   path: 'opportunities-payment-options',
      //   loadChildren: () => import('./pages/opportunities/opportunities-payment-options/opportunities-payment-options.module').then( m => m.OpportunitiesPaymentOptionsPageModule)
      // },
      // {
      //   path: 'opportunities-your-investment',
      //   loadChildren: () => import('./pages/opportunities/opportunities-your-investment/opportunities-your-investment.module').then( m => m.OpportunitiesYourInvestmentPageModule)
      // },
      {
        path: 'opportunities-retail', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/opportunities/opportunities-retail/opportunities-retail.module').then( m => m.OpportunitiesRetailPageModule)
        component: InvestMmTelecomRetailPage
      },
      {
        path: 'opportunities-amount', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/tabs/invest/investment-amount/investment-amount.page').then( m => m.InvestmentAmountPage)
        component: InvestmentAmountPage
      },
      {
        path: 'opportunities-confirmation', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/tabs/invest/investment-confirmaiton/investment-confirmaiton.page').then( m => m.InvestmentConfirmaitonPage)
        component: InvestmentConfirmaitonPage
      },
      {
        path: 'opportunities-payment-options', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/tabs/invest/payment-options/payment-options.page').then( m => m.PaymentOptionsPage)
        component:PaymentOptionsPage
      },
      {
        path: 'opportunities-your-investment', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/tabs/invest/your-investment/your-investment.page').then( m => m.YourInvestmentPage)
        component: YourInvestmentPage
      },
      {
        path: 'opportunities-address-confirm', canActivate: [AuthGuard],
        // loadChildren: () => import('./pages/tabs/invest/address-confirm/address-confirm.page').then( m => m.AddressConfirmPage)
        component: AddressConfirmPage
      },
      // tab pages
      {
        path: 'main',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
      },

];

@NgModule ({
  imports: [
    // IonicModule,
    // NgModule,
    RouterModule.forRoot(routes,
        {
          preloadingStrategy: PreloadAllModules,
          // enableTracing: false,
          // onSameUrlNavigation: 'reload',
          // scrollPositionRestoration: 'top',
          // scrollOffset: [0, 0]
        })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
