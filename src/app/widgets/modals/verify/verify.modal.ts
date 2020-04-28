import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController, NavController, Platform, ToastController} from '@ionic/angular';
import {ProfileService} from '../../../services/tabs/profile.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.modal.html',
  styleUrls: ['./verify.modal.scss'],
})
export class VerifyModalComponent implements OnInit {

  @Input () param: any;
  @Input () sendUrl: any;
  validate_form: FormGroup;
  isAuthSignin = false;
  submitState = false;
  isIosPlatform = false;
  validation_messages = {
    otp: [
      {type: 'required', message: 'Otp is required.'},
    ]
  };

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private platform: Platform,
    private profileService: ProfileService,
    private authService: AuthService,
    public storage: Storage,
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  ngOnInit() {
    this.validate_form = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  onSinginSubmit() {
    if (this.validate_form.valid) {
      this.submitState = true;
      this.isAuthSignin = true;
      let params = {};
      params = {...this.authService.userInfo, otp: this.validate_form.value.otp};
      this.profileService.verifyOTP(params).subscribe(res => {
        console.log('otp response -> : ', res);
        if (res.RESPONSECODE === 1) {
          this.profileService.saveProfile(this.sendUrl, this.param).subscribe(
              (result: any) => {
                console.log('result => ', result);
                if (result.RESPONSECODE === 1) {
                  this.profileService.savedProfileDetail = this.param;
                  console.log('success: ', result.RESPONSE);
                  this.updateStorage();
                } else if (result.RESPONSECODE === 0) {
                  console.log('error: ', result.RESPONSE);
                }
              },
              error => {
                console.log('error => ', error);
              }
          );
        }
      });
      setTimeout(() => {
        this.isAuthSignin = false;
        this.modalCtrl.dismiss();
      }, 1000);
    } else {
      this.submitState = true;
      this.isAuthSignin = false;
    }
  }

  updateStorage() {
    const type = this.authService.verification_type;
    this.storage.get('current_user').then(res => {

      if(type === 'sms') {
        res.data.user_info.verification.is_sms = true;

      } else if (type === 'bank') {
        res.data.user_info.verification.is_bank = true;
      } else if (type === 'id') {
        res.data.user_info.verification.is_id = true;
      }

      if (res.data.user_info.verification.is_id && res.data.user_info.verification.is_sms && res.data.user_info.verification.is_bank) {
        res.data.user_info.verification.is_verify = true;
        this.authService.is_verify = true;
      }
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      })
    })
  }

}
