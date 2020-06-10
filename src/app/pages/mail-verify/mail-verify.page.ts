import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from '../../services/UI/header.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../services/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../services/tabs/profile.service";

@Component({
  selector: 'app-mail-verify',
  templateUrl: './mail-verify.page.html',
  styleUrls: ['./mail-verify.page.scss'],
})
export class MailVerifyPage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  validate_form: FormGroup;
  isAuthSignin = false;
  submitState = false;
  isIosPlatform = false;
  validation_messages = {
    verify_code: [
      {type: 'required', message: 'Verification code is required.'},
      {type: 'minlength', message: 'Verification code must be at least 6 characters long.'},
    ]
  };

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
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
      this.menuCtrl.enable(false);
      this.userInfo = this.authService.userInfo;
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

  ngOnInit() {
    this.validate_form = this.formBuilder.group({
      verify_code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ]))
    });
  }

  onSinginSubmit() {
    if (this.validate_form.valid) {
      this.submitState = true;
      this.isAuthSignin = true;
      let params = {};
      params = {...this.authService.userInfo, verify_code: this.validate_form.value.verify_code};
      this.profileService.mailVerification(params).subscribe(res => {
        if (res.RESPONSECODE === 1) {
          console.log('success -> : ', res);
          this.submitState = false;
          this.isAuthSignin = false;
          this.updateStorage();
        }
      });
      setTimeout(() => {
        this.isAuthSignin = false;
      }, 1000);
    } else {
      this.submitState = true;
      this.isAuthSignin = false;
    }
  }

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.mail_verify = true;
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      })
    })
  }

}
