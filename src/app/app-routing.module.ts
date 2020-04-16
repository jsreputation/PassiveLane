import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/auth/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/auth/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },

  // invester type pages
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {
        path: 'mail-verify',
        loadChildren: () => import('./pages/mail-verify/mail-verify.module').then( m => m.MailVerifyPageModule)
      },
      {
        path: 'verify',
        loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
      },
      {
        path: 'investor-type',
        loadChildren: () => import('./pages/investor-type/investor-type.module').then(m => m.InvestorTypePageModule)
      },
      {
        path: 'qualification-criteria',
        loadChildren: () => import('./pages/qualification-criteria/qualification-criteria.module').then(m => m.QualificationCriteriaPageModule)
      },
      {
        path: 'experience-risk-awareness',
        loadChildren: () => import('./pages/experience-risk-awareness/experience-risk-awareness.module').then(m => m.ExperienceRiskAwarenessPageModule)
      },
      {
        path: 'agree-to-terms',
        loadChildren: () => import('./pages/agree-to-terms/agree-to-terms.module').then(m => m.AgreeToTermsPageModule)
      },
    ]
  },
  // opportunities pages
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {
        path: 'opportunities',
        loadChildren: () => import('./pages/opportunities/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'opportunities-retail',
        loadChildren: () => import('./pages/opportunities/opportunities-retail/opportunities-retail.module').then( m => m.OpportunitiesRetailPageModule)
      },
      {
        path: 'opportunities-amount',
        loadChildren: () => import('./pages/opportunities/opportunities-amount/opportunities-amount.module').then( m => m.OpportunitiesAmountPageModule)
      },
      {
        path: 'opportunities-confirmation',
        loadChildren: () => import('./pages/opportunities/opportunities-confirmation/opportunities-confirmation.module').then( m => m.OpportunitiesConfirmationPageModule)
      },
      {
        path: 'opportunities-payment-options',
        loadChildren: () => import('./pages/opportunities/opportunities-payment-options/opportunities-payment-options.module').then( m => m.OpportunitiesPaymentOptionsPageModule)
      },
      {
        path: 'opportunities-your-investment',
        loadChildren: () => import('./pages/opportunities/opportunities-your-investment/opportunities-your-investment.module').then( m => m.OpportunitiesYourInvestmentPageModule)
      },
    ]
  },
  // tab pages
  {
    path: '', canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },

];

@NgModule({
  imports: [
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
