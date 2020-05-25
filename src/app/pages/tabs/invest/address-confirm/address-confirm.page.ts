import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HeaderService } from 'src/app/services/UI/header.service';
import { Events, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/tabs/profile.service';

@Component({
  selector: 'app-address-confirm',
  templateUrl: './address-confirm.page.html',
  styleUrls: ['./address-confirm.page.scss'],
})
export class AddressConfirmPage implements OnInit {
  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  private hidden = false;
  private triggerDistance = 42;
  public deal_info = {} as any;
  readyToNext = false;
  steps: number;
  loading: any;
  formValue: any;
  constructor(
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private renderer: Renderer2,
    private events: Events,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('++++++++++++++', params);
      if (params) {
        this.deal_info = params;
        this.steps = parseInt(params.totalSteps, 10);
        this.listenEvents();
      }
    });
  }

  listenEvents() {
    this.events.subscribe('setNextValid', (res) => {
      if (res) {
        this.readyToNext = true;
        this.formValue = res;
      } else {
        this.readyToNext = false;
      }
    });
  }

  gotoPaymentOptions() {
    // this.showloading();
    this.saveAddress().then((res) => {
      // this.loading.dismiss();
      if (res) {
        // console.log(this.deal_info);
        this.deal_info = { ... this.deal_info };
        this.deal_info.step = parseInt(this.deal_info.step, 10) + 1;
        const navigationExtras: NavigationExtras = {
            queryParams: this.deal_info
        };
        if (this.deal_info.newurl) {
          this.router.navigate(['opportunities-payment-options'], navigationExtras);
        } else {
          this.router.navigate(['main/invest/payment-options'], navigationExtras);
        }
      } else {

      }
    }).catch((err) => {
      this.loading.dismiss();
    });
  }

  saveAddress(): Promise<any> {
    return new Promise((resolve, reject) => {
      let param = {} as any;
      param = {...this.authService.userInfo, ...this.formValue};
      this.profileService.saveProfile('https://www.passivelane.com/apiinvestor/saveprofileaddressinfo', param).subscribe(
          (result: any) => {
              if (result.RESPONSECODE === 1) {
                  resolve(true);
              } else if (result.RESPONSECODE === 0) {
                  reject(false);
              }
          },
          error => {
            reject(false);
          }
      );
    });
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

  fn_back() {
    const backNavigationExtras: NavigationExtras = {
      queryParams: this.deal_info
    };
    if (this.deal_info.newurl) {
      this.router.navigate(['opportunities-amount', backNavigationExtras]);
    } else {
      this.router.navigate(['main/invest/investment-amount'], backNavigationExtras);
    }
  }

  async showloading() {
    this.loading = await this.loadingCtrl.create({
      spinner: 'circles',
      mode: 'ios'
    });
    await this.loading.present();
  }
}
