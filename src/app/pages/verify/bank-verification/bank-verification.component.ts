import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController, ModalController, Platform} from "@ionic/angular";
import {ProfileService} from "../../../services/tabs/profile.service";
import {AuthService} from "../../../services/auth/auth.service";
import {HeaderService} from "../../../services/UI/header.service";
import {Storage} from "@ionic/storage";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VerifyModalService} from "../../../widgets/components/profile/verifyModal.service";

@Component({
  selector: 'app-bank-verification',
  templateUrl: './bank-verification.component.html',
  styleUrls: ['./bank-verification.component.scss'],
})
export class BankVerificationComponent implements OnInit {

  private addUrl = 'https://www.passivelane.com/apiinvestor/saveprofilebankinfo';

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  validate_form: FormGroup;
  isSubmitReadies = false;
  submitStates = false;
  isAddedStates = false;
  isIosPlatform = false;
  validation_messages = {

    bank_id: [],

    bankAccountHolder: [
      {type: 'required', message: 'Account holder\'s name is required.'}
    ],
    bank_acc_country: [
      {type: 'required', message: 'Bank account country is required.'}
    ],
    bankAccountNumber: [
      {type: 'required', message: 'Bank account number is required.'},
      {type: 'minlength', message: 'Bank account must be at least 8 characters long.'},
    ],
    bankSortCode: [
      {type: 'required', message: 'Bank sort code is required.'},
      {type: 'minlength', message: 'Bank sort code must be at least 6 characters long.'},
    ],

    bankIFSCCode: [],

    bankABANumber: [],

    bankRoutingCode: [],

    bankAccountIban: [],

    bankAccountBic: [],

    bankname: [
      {type: 'required', message: 'Bank name is required.'}
    ],
    bankbranch: [
      {type: 'required', message: 'Bank branch is required.'}
    ],
    bankaddress: [
      {type: 'required', message: 'Bank address is required.'}
    ],
    bankcity: [
      {type: 'required', message: 'Bank city is required.'}
    ],
  };

  accountCountries = [] as any;
  bankDetails = [] as any;

  isAutoSelect = false;
  searchError = [] as any;


  private hidden = false;
  private triggerDistance = 42;
  userInfo = {} as any;

  constructor(
      private renderer: Renderer2,
      private router: Router,
      public formBuilder: FormBuilder,
      private platform: Platform,
      private profileService: ProfileService,
      private authService: AuthService,
      private headerService: HeaderService,
      public storage: Storage,
      public route: ActivatedRoute,
      public menuCtrl: MenuController,
      private verifyMdlService: VerifyModalService,
      private modalCtrl: ModalController,
      public fb: FormBuilder,
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
      this.menuCtrl.enable(false);
      this.userInfo = this.authService.userInfo;
    }
  }

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.verification.is_bank = true;
      if (res.data.user_info.verification.is_id && res.data.user_info.verification.is_sms && res.data.user_info.verification.is_bank) {
        res.data.user_info.verification.is_verify = true;
      }
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      })
    })
  }

  ionViewWillLeave() {
    if (!this.hidden) {
      this.headerService.headerClear(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }

  scroll(ev: any) {

    if (!this.hidden && ev.detail.currentY > this.triggerDistance) {
      this.hidden = true;
      return this.headerService.headerHide(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    } else if (this.hidden && ev.detail.currentY <= this.triggerDistance) {
      this.hidden = false;
      return this.headerService.headerShow(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }

  ngOnInit() {
    this.initBankInfo();
  }

  initBankInfo() {

    this.validate_form = this.fb.group({
      bankDetails: this.fb.array([])
    });

    this.bankDetails = [] as any;
    this.setBankDetails();
  }

  get bankDetailsArray() {
    return this.validate_form.controls.bankDetails as FormArray;
  }

  setBankDetails() {
    const control = this.validate_form.controls.bankDetails as FormArray;
    const initialVal = this.initFormGroup({} as any);
    this.bankDetails.push({...initialVal.value});
    control.push(initialVal);
    this.isSubmitReadies = false;
    this.submitStates = false;
    this.isAddedStates = false;
  }

  onFormSubmit() {
    const index = 0;
    const control = this.validate_form.controls.bankDetails as FormArray;
    console.log(control);
    if (control.controls[index].valid) {
      this.submitStates = true;
      this.isSubmitReadies = true;
      let submitParams = {} as any;
      submitParams = {...this.authService.userInfo, user_type: this.authService.user_name_info.user_type, ...this.validate_form.value.bankDetails[index]};
      console.log(' ####### submitting ######## ', submitParams);

      //
      // this.profileService.saveProfile(this.addUrl, submitParams).subscribe(
      //     (result: any) => {
      //       console.log('result => ', result);
      //       if (result.RESPONSECODE === 1) {
      //         console.log('success: ', result.RESPONSE);
      //         this.updateStorage();
      //       } else if (result.RESPONSECODE === 0) {
      //         console.log('error: ', result.RESPONSE);
      //       }
      //     },
      //     error => {
      //       console.log('error => ', error);
      //     }
      // );
      // return;

      this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
        if (res.RESPONSECODE === 1) {
          this.authService.verification_type = 'bank';
          await this.verifyMdlService.showMdl(this.addUrl, submitParams);
          this.submitStates = false;
          this.isSubmitReadies = false;
        } else {
          console.log('error : ', res);
          this.isSubmitReadies = false;
        }
      });
    } else {
      this.submitStates = true;
      this.isSubmitReadies = false;
    }
  }

  initFormGroup(data: any) {
    this.accountCountries = this.profileService.countries;
    return this.fb.group({
      bank_id: new FormControl(data.bank_id || '', Validators.compose([])),

      bankAccountHolder: new FormControl(data.account_holder || '', Validators.compose([
        Validators.required
      ])),
      bank_acc_country: new FormControl(data.bank_acc_country || this.accountCountries[0].country || '', Validators.compose([
        Validators.required
      ])),
      bankAccountNumber: new FormControl(data.account_number || '', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
      bankSortCode: new FormControl(data.sort_code || '', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])),

      bankIFSCCode: new FormControl('', Validators.compose([])),

      bankABANumber: new FormControl('', Validators.compose([])),

      bankRoutingCode: new FormControl('', Validators.compose([])),

      bankAccountBic: new FormControl(data.bic || '', Validators.compose([])),

      bankAccountIban: new FormControl(data.iban || '', Validators.compose([])),

      bankname: new FormControl(data.bank_name || '', Validators.compose([
        Validators.required
      ])),
      bankbranch: new FormControl(data.bank_branch || '', Validators.compose([
        Validators.required
      ])),
      bankaddress: new FormControl(data.bank_address || '', Validators.compose([
        Validators.required
      ])),
      bankcity: new FormControl(data.bank_city || '', Validators.compose([
        Validators.required
      ])),
    });
  }

  searchBankInfo(index: any) {

    const data = {
      key: encodeURIComponent('PN88-RM89-XR98-ZG26'),
      AccountNumber: this.validate_form.value.bankDetails[index].bankAccountNumber,
      SortCode: this.validate_form.value.bankDetails[index].bankSortCode,
    };
    this.searchError = [] as any;
    this.profileService.getBankInfo(data).subscribe(
        (result: any) => {
          if (result.Items.length === 1 && typeof (result.Items[0].Error) !== 'undefined') {
            console.log(result.Items[0].Description);
            this.searchError[index] = result.Items[0].Description;
            return;
          } else {
            if (!result.Items[0].IsCorrect) {
              this.searchError[index] = result.Items[0].StatusInformation;
              return;
            }
            if (result.Items.length > 0) {
              // patching data ....................
              const patchData = {
                sort_code: data.SortCode,
                account_number: data.AccountNumber,
                iban: result.Items[0].IBAN,
                bic: result.Items[0].BankBIC,
                bank_name: result.Items[0].Bank,
                bank_branch: result.Items[0].Branch,
                bank_address: result.Items[0].ContactAddressLine1,
                bank_city: result.Items[0].ContactPostTown,
              };
              this.updateFormFromResponse(patchData, index);

            } else {
              console.log('Sorry, there were no results');
            }
          }
        },
        error => {
          console.log('error => ', error);
        }
    );
  }

  onCheck(event: any) {
    this.isAutoSelect = event.detail.value;
  }

  updateFormFromResponse(data: any, index: number) {
    const control = this.validate_form.controls.bankDetails as FormArray;
    const form = control.controls[index];
    form.get('bankSortCode').setValue(data.sort_code);
    form.get('bankAccountNumber').setValue(data.account_number);
    form.get('bankAccountIban').setValue(data.iban);
    form.get('bankAccountBic').setValue(data.bic);
    form.get('bankname').setValue(data.bank_name);
    form.get('bankbranch').setValue(data.bank_branch);
    form.get('bankaddress').setValue(data.bank_address);
    form.get('bankcity').setValue(data.bank_city);
    return;
  }

}
