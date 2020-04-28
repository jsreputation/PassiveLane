import {Component, OnInit} from '@angular/core';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.modal.html',
  styleUrls: ['./forgot-password.modal.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  validate_reset_password: FormGroup;
  isAuthSignin = false;
  submitState = false;
  isIosPlatform = false;
  validation_messages = {
    email: [
      {type: 'required', message: 'Email is required.'},
      {type: 'pattern', message: 'Please enter a valid email.'}
    ]
  };

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public navController: NavController,
    private platform: Platform,
    private authService: AuthService
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  ngOnInit() {
    this.validate_reset_password = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  onSinginSubmit() {
    if (this.validate_reset_password.valid) {
      this.submitState = true;
      this.isAuthSignin = true;
      this.authService.passwordRecover({email: this.validate_reset_password.value.email}).subscribe(
          async (result: any) => {
            console.log('result => ', result);
            if (result.RESPONSECODE === 1) {
              console.log('success: ', result.RESPONSE);
              await this.modalCtrl.dismiss();
            } else if (result.RESPONSECODE === 0) {
              await this.modalCtrl.dismiss();
              console.log('error: ', result.RESPONSE);
            }
          },
          error => {
            this.modalCtrl.dismiss();
            console.log('error => ', error);
          }
      );
      setTimeout(() => {
        this.isAuthSignin = false;
      }, 1000);
    } else {
      this.submitState = true;
      this.isAuthSignin = false;
    }
  }

  userTyping(event) {
    if (event.keyCode === 13) {
      this.onSinginSubmit();
    }
  }
}
