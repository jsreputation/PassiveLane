import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {MatSliderModule} from '@angular/material/slider';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {AvatarModule} from 'ngx-avatar';


import {MenuComponent} from './menu/menu.component';
import {StepperComponent} from './stepper/stepper.component';
import {OpportunitiesDetailsComponent} from './opportunities-details/opportunities-details.component';
import {TelecomRetailComponent} from './telecom-retail/telecom-retail.component';
import {ActivityDetailsComponent} from './activity-details/activity-details.component';
import {MyDealBarchartComponent} from './my-deal-barchart/my-deal-barchart.component';
import {ChartsModule} from 'ng2-charts';
import {MyDealMmTelecomRetailComponent} from './my-deal-mm-telecom-retail/my-deal-mm-telecom-retail.component';
import {CacheOutDetailsComponent} from './cache-out-details/cache-out-details.component';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {BasicInfoFormComponent} from './profile/basic-info-form/basic-info-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddressFormComponent} from './profile/address-form/address-form.component';
import {ContactNumberFormComponent} from './profile/contact-number-form/contact-number-form.component';
import {ChangePasswordFormComponent} from './profile/change-password-form/change-password-form.component';
import {BankDetailsFormComponent} from './profile/bank-details-form/bank-details-form.component';
import {GotoInvestorTypeFormComponent} from './profile/goto-investor-type-form/goto-investor-type-form.component';
import {SignatureFormComponent} from './profile/signature-form/signature-form.component';
import {LogoComponent} from './logo/logo.component';
import {ProgressBarModule} from 'angular-progress-bar';
import {GetMatiVerificationComponent} from './profile/get-mati-verification/get-mati-verification.component';
import {ProofOfIdComponent} from './profile/proof-of-id/proof-of-id.component';
import {WhiteLogoComponent} from './white-logo/white-logo.component';
import {PopoverComponent} from './popover/popover.component';
// skeletons
import { RowsComponent } from './skeletons/rows/rows.component';
import { CardsComponent } from './skeletons/cards/cards.component';

@NgModule({
    declarations: [
        LogoComponent, WhiteLogoComponent, MenuComponent, StepperComponent, OpportunitiesDetailsComponent, TelecomRetailComponent, ActivityDetailsComponent, MyDealBarchartComponent, MyDealMmTelecomRetailComponent, CacheOutDetailsComponent,
        // tslint:disable-next-line: max-line-length
        SignaturePad, BasicInfoFormComponent, AddressFormComponent, ContactNumberFormComponent, ChangePasswordFormComponent, BankDetailsFormComponent, GotoInvestorTypeFormComponent, SignatureFormComponent, GetMatiVerificationComponent, ProofOfIdComponent,
        PopoverComponent,
        CardsComponent,
        RowsComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        MatSliderModule,
        NgCircleProgressModule.forRoot({
            // set defaults here
            showSubtitle: false,
            radius: 34,
            outerStrokeColor: '#FFBC00',
            innerStrokeColor: '#EAEAEA',
            animationDuration: 300,
            titleColor: '#FFBC00',
            unitsColor: '#FFBC00',
            responsive: true,
            showInnerStroke: true,
            space: -4,
            innerStrokeWidth: 2

        }),
        ProgressBarModule,
        AvatarModule,
        ChartsModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        LogoComponent, WhiteLogoComponent, MenuComponent, StepperComponent, OpportunitiesDetailsComponent, TelecomRetailComponent, ActivityDetailsComponent, MyDealBarchartComponent, MyDealMmTelecomRetailComponent, CacheOutDetailsComponent,
        // tslint:disable-next-line: max-line-length
        SignaturePad, BasicInfoFormComponent, AddressFormComponent, ContactNumberFormComponent, ChangePasswordFormComponent, BankDetailsFormComponent, GotoInvestorTypeFormComponent, SignatureFormComponent, GetMatiVerificationComponent, ProofOfIdComponent,
        PopoverComponent,
        CardsComponent,
        RowsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    entryComponents: [
        BasicInfoFormComponent,
        AddressFormComponent,
        ContactNumberFormComponent,
        ChangePasswordFormComponent,
        BankDetailsFormComponent,
        GotoInvestorTypeFormComponent,
        SignatureFormComponent,
        ProofOfIdComponent,
        PopoverComponent
    ]
})

export class ComponentsModule {
}
