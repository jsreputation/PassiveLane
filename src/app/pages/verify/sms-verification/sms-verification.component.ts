import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
import {ProfileService} from '../../../services/tabs/profile.service';
import {AuthService} from '../../../services/auth/auth.service';
import {HeaderService} from '../../../services/UI/header.service';
import {Storage} from '@ionic/storage';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PhoneNumberValidator} from '../../../services/validator/phoneNumberValidator.validator';
import {VerifyModalService} from '../../../widgets/components/profile/verifyModal.service';


@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss'],
})
export class SmsVerificationComponent implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  private submitParams = {} as any;
  private sendUrl = 'https://www.passivelane.com/apiinvestor/addcontact';
  validate_form: FormGroup;
  isSubmitReady = false;
  submitState = false;
  isIosPlatform = false;

  countries = [] as any;

  validation_messages = {
    country: [
      {type: 'required', message: 'Country name is required.'}
    ],
    phone_prefix: [
      {type: 'required', message: 'Phone prefix is required.'},
    ],
    phone: [
      {type: 'required', message: 'Phone number is required.'},
      {type: 'invalidPhoneNumber', message: 'Phone number is invalid.'}
    ],
  };

  private hidden = false;
  private triggerDistance = 42;
  userInfo = {} as any;
  user_name_info = {} as any;

  constructor(
      private renderer: Renderer2,
      private router: Router,
      public formBuilder: FormBuilder,
      private platform: Platform,
      private profileService: ProfileService,
      private authService: AuthService,
      private headerService: HeaderService,
      public route: ActivatedRoute,
      public menuCtrl: MenuController,
      public storage: Storage,
      private verifyMdlService: VerifyModalService
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
      this.menuCtrl.enable(false);
      this.userInfo = this.authService.userInfo;
      this.user_name_info = this.authService.user_name_info;
      console.log(this.user_name_info);
    }
  }

  ngOnInit() {
    this.countries = this.profileService.countries;
    const firstCountryObject = this.countries[0];
    this.validate_form = this.formBuilder.group({
      country: new FormControl(firstCountryObject.country, Validators.compose([
        Validators.required
      ])),
      phone_prefix: new FormControl(firstCountryObject.phonePrefix, Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    }, {
      validator: PhoneNumberValidator.validPhoneNumber('phone_prefix', 'phone'),
    });
  }

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.verification.is_sms = true;
      this.user_name_info = res.data.user_info;
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.submitState = false;
          this.isSubmitReady = false;
          this.authService.ifLoggedIn();
        }, 500);
      });
    });
  }

  onFormSubmit() {
    if (this.user_name_info.is_phonenumber) {
      this.submitState = true;
      this.isSubmitReady = true;
      this.updateStorage();
    }

    if (this.validate_form.valid) {
      this.submitState = true;
      this.isSubmitReady = true;
      this.submitParams = {...this.submitParams, ...this.validate_form.value, ...this.authService.userInfo};

      // this.profileService.saveProfile(this.sendUrl, this.submitParams).subscribe(
      //     (result: any) => {
      //       console.log('result => ', result);
      //       if (result.RESPONSECODE === 1) {
      //         console.log('success: ', result.RESPONSE);
      //         this.updateStorage();
      //         // this.authService.ifLoggedIn();
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
          this.authService.verification_type = 'sms';
          await this.verifyMdlService.showMdl(this.sendUrl, this.submitParams);
          this.submitState = false;
          this.isSubmitReady = false;
        } else {
          console.log('error : ', res);
          this.isSubmitReady = false;
        }
      });
    } else {
      this.submitState = true;
      this.isSubmitReady = false;
    }
  }

  onChange() {
    const {country} = this.validate_form.value;
    const curCountry = this.countries.find(element => element.country === country);
    if (!curCountry) {
      return;
    }
    const newPhonePrefix = curCountry.phonePrefix;
    this.validate_form.patchValue({phone_prefix: newPhonePrefix});
  }

  userTypingForm(event) {
    if (event.keyCode === 13) {
      this.onFormSubmit();
    }
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


}
