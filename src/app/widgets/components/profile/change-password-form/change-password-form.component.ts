import { ToastService } from './../../../../services/UI/toast.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {VerifyModalService} from '../verifyModal.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent implements OnInit {

  validate_form: FormGroup;
  isSubmitReady = false;
  submitState = false;
  isIosPlatform = false;
  oldPasswordType = 'password';
  oldPasswordShown = false;
  newPasswordType = 'password';
  newPasswordShown = false;

  validation_messages = {
    oldPassword: [
      {type: 'required', message: 'Old password is required.'},
      {type: 'minlength', message: 'Old password must be at least 6 characters long.'},
    ],
    newPassword: [
      {type: 'required', message: 'New password is required.'},
      {type: 'minlength', message: 'New password must be at least 6 characters long.'},
    ],
  };
  // private sendUrl = 'https://www.passivelane.com/apiinvestor/changepassword';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private platform: Platform,
    private profileService: ProfileService,
    private authService: AuthService,
    private verifyMdlService: VerifyModalService,
    private toastCtrl: ToastService
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  oldtogglePassword() {
    if (this.oldPasswordShown) {
      this.oldPasswordShown = false;
      this.oldPasswordType = 'password';
    } else {
      this.oldPasswordShown = true;
      this.oldPasswordType = 'text';
    }
  }

  newtogglePassword() {
    if (this.newPasswordShown) {
      this.newPasswordShown = false;
      this.newPasswordType = 'password';
    } else {
      this.newPasswordShown = true;
      this.newPasswordType = 'text';
    }
  }

  ngOnInit() {
    this.validate_form = this.formBuilder.group({
      oldPassword: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ])),
      newPassword: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ]))
    });
  }

  async onFormSubmit() {
    if (this.validate_form.valid) {
      console.log('success : ', this.validate_form.value);
      this.submitState = true;
      this.isSubmitReady = true;
      let submitParams = {} as any;
      submitParams = {...this.authService.userInfo, ...this.validate_form.value};
      // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
      //   console.log(res);
      //   if (res.RESPONSECODE === 1) {
      //     await this.verifyMdlService.showMdl(this.sendUrl, submitParams);
      //     this.submitState = false;
      //     this.isSubmitReady = false;
      //   } else {
      //     console.log('error : ', res);
      //     this.isSubmitReady = false;
      //   }
      // });
      this.profileService.changePassword(submitParams).subscribe(
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

  userTypingForm(event) {
    if (event.keyCode === 13) {
      this.onFormSubmit();
    }
  }


}
