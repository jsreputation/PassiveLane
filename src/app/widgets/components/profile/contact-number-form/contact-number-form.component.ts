import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController, Platform} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {PhoneNumberValidator} from '../../../../services/validator/phoneNumberValidator.validator';
import {VerifyModalService} from '../verifyModal.service';
import { ToastService } from 'src/app/services/UI/toast.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-contact-number-form',
  templateUrl: './contact-number-form.component.html',
  styleUrls: ['./contact-number-form.component.scss'],
})
export class ContactNumberFormComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private platform: Platform,
    private authService: AuthService,
    private profileService: ProfileService,
    private toastCtrl: ToastService
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

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

  ngOnInit() {
    this.countries = this.profileService.countries;
    console.log(this.countries);
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
    this.initializeData();
  }

  async initializeData() {
    let contactInfo = {} as any;
    contactInfo = await this.profileService.getContactNumber().toPromise();
    if (contactInfo.RESPONSECODE === 1) {
      const initVal = contactInfo.data.contact_info;
      console.log(initVal);
      this.validate_form.patchValue({
        country: initVal.country,
        phone_prefix: initVal.phone_prefix,
        phone: initVal.phone,
      });
    }
  }

  async onFormSubmit() {
    if (this.validate_form.valid) {
      this.submitState = true;
      this.isSubmitReady = true;
      this.submitParams = {...this.submitParams, ...this.validate_form.value, ...this.authService.userInfo};
      console.log(this.submitParams);
      // this.profileService.saveProfile(this.sendUrl, this.submitParams).subscribe(
      //     (result: any) => {
      //       console.log('result => ', result);
      //       if (result.RESPONSECODE === 1) {
      //         // this.profileService.savedProfileDetail = this.submitParams;
      //         console.log('success: ', result.RESPONSE);
      //       } else if (result.RESPONSECODE === 0) {
      //         console.log('error: ', result.RESPONSE);
      //       }
      //     },
      //     error => {
      //       console.log('error => ', error);
      //     }
      // );
      // return;

      // this.validate_form.value = {...this.validate_form.value, {res}};
      // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
      //   console.log(res);
      //   if (res.RESPONSECODE === 1) {
      //     await this.verifyMdlService.showMdl(this.sendUrl, this.submitParams);
      //     this.submitState = false;
      //     this.isSubmitReady = false;
      //   } else {
      //     console.log('error : ', res);
      //     this.isSubmitReady = false;
      //   }
      // });

      this.profileService.saveProfile(this.sendUrl, this.submitParams).subscribe(
          (result: any) => {
              this.submitState = false;
              this.isSubmitReady = false;
              if (result.RESPONSECODE === 1) {
                  // this.toastCtrl.presentSpecificText('Saved successfully.');
              } else if (result.RESPONSECODE === 0) {
                  // this.toastCtrl.presentSpecificText('Failed saving.');
              }
          },
          error => {
              this.submitState = false;
              this.isSubmitReady = false;
              this.toastCtrl.presentSpecificText('Sever Api problem.');
          }
      );
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

}
