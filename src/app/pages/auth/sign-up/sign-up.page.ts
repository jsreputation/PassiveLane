import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController, NavController, Platform} from '@ionic/angular';
import {Router, ActivatedRoute} from '@angular/router';
import {ConfirmModalComponent} from '../../../widgets/modals/confirm/confirm.modal';
import {myEnterAnimation} from 'src/app/widgets/animations/enter.animation';
import {myLeaveAnimation} from 'src/app/widgets/animations/leave.animation';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ProfileService} from '../../../services/tabs/profile.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  referal_email = '';
  referal_code = '';
  passwordType = 'password';
  passwordShown = false;
  validate_signupform: FormGroup;
  isAuthSignin = false;
  submitState = false;
  isIosPlatform = false;
  is_company = false;
  errorMessage = '';
  validation_messages = {
    first_name: [
      {type: 'required', message: 'First name is required.'}
    ],
    // middle_name: [
    //   {type: 'required', message: 'Middle name is required.'}
    // ],
    last_name: [
      {type: 'required', message: 'Last name is required.'}
    ],
    user_type: [
      {type: 'required', message: 'User type is required.'}
    ],
    company_name: [
      {type: 'required', message: 'Company name is required.'}
    ],
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
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ],
    refer_by: [
      {type: 'required', message: 'Referral code is required.'},
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters long.'},
    ],
    day_of_birth: [
      {type: 'required', message: 'Birth day is required.'},
    ],
  };

  userTypes = ['Individual', 'Company'];
  countries = [] as any;

  constructor(
      private router: Router,
      private modalCtrl: ModalController,
      public formBuilder: FormBuilder,
      public navController: NavController,
      private platform: Platform,
      private menuCtrl: MenuController,
      private authService: AuthService,
      private profileService: ProfileService,
      private route: ActivatedRoute
  ) {
    this.menuCtrl.enable(false);
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  ngOnInit() {
    this.countries = this.profileService.countries;
    const firstCountryObject = this.countries[0];
    this.validate_signupform = this.formBuilder.group({
      first_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      middle_name: new FormControl('', Validators.compose([
        // Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      user_type: new FormControl(this.userTypes[0] || '', Validators.compose([
        Validators.required
      ])),
      company_name: [],
      country: new FormControl(firstCountryObject.country, Validators.compose([
        Validators.required
      ])),
      phone_prefix: new FormControl(firstCountryObject.phonePrefix, Validators.compose([
        Validators.required,
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      refer_by: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ])),
      day_of_birth: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.getParamsFromBranch();
  }

  getParamsFromBranch() {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.referal_email = params.referal_email;
        this.referal_code = params.referal_code;
      }
    });
  }

  async onSingupSubmit() {
    if (this.validate_signupform.valid) {
      this.submitState = true;
      this.isAuthSignin = true;
      // this.validate_signupform.value.password = Md5.hashStr(this.validate_signupform.value.password);
      console.log('password : ', this.validate_signupform.value);
      this.authService.signup(this.validate_signupform.value).subscribe(
          (result: any) => {
            console.log('result => ', result);
            if (result.RESPONSECODE === 1) {
              console.log(result.RESPONSE);
              this.isAuthSignin = false;
              this.submitState = false;
              this.singnInDialog();
            } else if (result.RESPONSECODE === 0) {
              console.log('error : ', result.RESPONSE);
              this.isAuthSignin = false;
            }
          },
          error => {
            console.log('error => ', error);
            this.isAuthSignin = false;
          }
      );
    } else {
      this.submitState = true;
      this.isAuthSignin = false;
    }
  }

  userTypingSingin(event) {
    if (event.keyCode === 13) {
      this.onSingupSubmit();
    }
  }

  async singnInDialog() {
    const modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      cssClass: 'confirm-modal',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation
    });
    await modal.present();
  }

  gotoSignIn() {
    this.router.navigate(['sign-in']);
  }

  userTypeChange() {
    const userType = this.validate_signupform.value;
    if (userType.user_type === 'Company') {
      this.is_company = true;
    } else {
      this.is_company = false;
      this.validate_signupform.value.company_name = null;
    }
    if (this.is_company) {
      this.validate_signupform.controls.company_name.setValidators([Validators.required]);
    }
    console.log(userType);
  }

  countryChange() {
    const {country} = this.validate_signupform.value;
    const curCountry = this.countries.find(element => element.country === country);
    if (!curCountry) {
      return;
    }
    const newPhonePrefix = curCountry.phonePrefix;
    this.validate_signupform.patchValue({phone_prefix: newPhonePrefix});
    console.log('country : ', this.validate_signupform.value);
  }

}
