import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
import {ProfileService} from '../../../services/tabs/profile.service';
import {AuthService} from '../../../services/auth/auth.service';
import {HeaderService} from '../../../services/UI/header.service';
import {Storage} from '@ionic/storage';
import {ToastService} from '../../../services/UI/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  isIosPlatform = false;

  private hidden = false;
  private triggerDistance = 42;
  userInfo = {} as any;

  is_id = false;
  is_sms = false;
  is_bank = false;
  id_status = '';

  idVerification = {} as any;

  idVerifications = [
    { id_status: 'verified', icon: 'checkmark-circle-outline', classname: 'verified', description: 'Photo Id is verified'},
    { id_status: 'manual review', icon: 'checkmark-circle-outline', classname: 'manual', description: 'Photo Id is under Manual Review' },
    { id_status: 'rejected', icon: 'close', classname: 'rejected', description: 'Photo Id is rejected' }
  ];

  constructor(
      private renderer: Renderer2,
      private router: Router,
      private platform: Platform,
      private profileService: ProfileService,
      private authService: AuthService,
      private headerService: HeaderService,
      public storage: Storage,
      public route: ActivatedRoute,
      public menuCtrl: MenuController,
      private toastUIService: ToastService
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
      this.menuCtrl.enable(false);
      this.userInfo = this.authService.userInfo;
    }
  }

  ionViewWillEnter() {
    this.is_id = this.authService.user_name_info.verification.is_id;
    this.is_sms = this.authService.user_name_info.is_phonenumber;
    this.is_bank = this.authService.user_name_info.verification.is_bank;
    this.id_status = this.authService.user_name_info.verification.id_status;

    // id verification statue
    if (this.id_status === 'verified') {
      this.idVerification = this.idVerifications[0];
    } else if (this.id_status === 'manual review') {
      this.idVerification = this.idVerifications[1];
    } else if (this.id_status === 'rejected') {
      this.idVerification = this.idVerifications[2];
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

  }

  skip() {
    // this.authService.deals_added = false;
    // this.router.navigate(['main'], { replaceUrl: true });
    // if (!this.authService.is_verify) {
    //   const res = {
    //     RESPONSECODE: 0,
    //     RESPONSE: 'Please finish all of your 3-step verification.'
    //   };
    //   this.toastUIService.presentToast(res, 'warning');
    // }
    this.authService.gotoPage();
  }

  logout() {
    this.authService.logout();
  }

}
