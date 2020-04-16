import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {myEnterAnimation} from 'src/app/widgets/animations/enter.animation';
import {myLeaveAnimation} from 'src/app/widgets/animations/leave.animation';
import {MenuController, ModalController, NavController, Platform} from '@ionic/angular';
import {ForgotPasswordComponent} from 'src/app/widgets/modals/forgot-password/forgot-password.modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Storage} from '@ionic/storage';
import {Md5} from 'ts-md5';

// import { bcrypt } from 'bcrypt';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})

export class SignInPage implements OnInit {

  validate_signinform: FormGroup;
  isAuthSignin = false;
  isIosPlatform = false;
  submitState = false;

  errorMessage = {
    error_email: '',
    error_password: ''
  };

  validation_messages = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'},
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters long.'},
    ],
  };


  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public navController: NavController,
    private platform: Platform,
    private menuCtrl: MenuController,
    private authService: AuthService,
    public storage: Storage,
  ) {
    this.menuCtrl.enable(false);
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  ngOnInit() {
    this.createValidation();
  }

  createValidation() {
    this.validate_signinform = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ]))
    });
  }

  async onSinginSubmit() {
    if (this.validate_signinform.valid) {
      this.isAuthSignin = true;
      this.submitState = true;
      this.storage.get('device_id').then((response) => {
        let device_id = '';
        device_id = response;
        console.log("device_id : " + device_id);
        let submitParam = {} as any;
        submitParam = {...this.validate_signinform.value, device_id: device_id};
        console.log('login info : ', submitParam);
        this.authService.login(submitParam).subscribe(
          (result: any) => {
            console.log(result);
            if (result.RESPONSECODE === 1) {
              this.authService.userInfo = {
                user_id: result.data.user_info.user_id,
                token: result.token,
              };
              this.authService.user_name_info = result.data.user_info;
              this.storage.set('current_user', result).then((response) => {
                this.errorMessage.error_email = '';
                this.errorMessage.error_password = '';
                this.submitState = false;
                this.isAuthSignin = false;
                if (result) {
                  this.authService.storageCheck(result);
                  this.gotoHomePage(result.data.user_info);
                }
              });
            } else {
              console.log('error : ', result);
              this.errorMessage.error_email = result.RESPONSE;
              this.errorMessage.error_password = result.RESPONSE;
              this.isAuthSignin = false;
            }
          }
          , error => {
            this.isAuthSignin = false;
            console.log('error : > ', error);
          },
        );
      });
    }

  }

  gotoHomePage(param) {
    if (param.mail_verify) {
      if (param.is_verify) {
        if (param.is_onboarding) {
          if (param.deals_added) {
            this.router.navigate(['/tabs/my-deal']);
          } else {
            this.router.navigate(['/opportunities']);
          }
        } else {
          this.router.navigate(['investor-type']);
        }
      } else {
        this.router.navigate(['/verify']);
      }
    } else {
      this.router.navigate(['/mail-verify']);
    }
  }

  userTypingSingin(event) {
    this.errorMessage.error_email = '';
    this.errorMessage.error_password = '';
    if (event.keyCode === 13) {
      this.onSinginSubmit();
    }
  }

  gotoSignUp() {
    this.router.navigate(['sign-up']);
  }

  async gotoForgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordComponent,
      cssClass: 'forgotPassword-modal',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });
    await modal.present();
  }


}
