import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from 'src/app/services/UI/header.service';
import {InvestService} from 'src/app/services/tabs/invest.service';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.page.html',
  styleUrls: ['./payment-options.page.scss'],
})
export class PaymentOptionsPage implements OnInit {


  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';
  public isSubmit = false;
  public form = [
    {val: 'I understand the transfer must be made within 7 working days or my allocation may be released.', isChecked: false},
  ];
  private hidden = false;
  private triggerDistance = 42;
  public submitparams: any;
  public totalSteps: number;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.submitparams = {...params};
        this.totalSteps = parseInt(params.totalSteps, 10);
      }
    });
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

  onSelect(event) {
    if (event.detail.checked) {
      this.isSubmit = true;
    } else {
      this.isSubmit = false;
    }
  }


  fn_back() {
    delete this.submitparams.targetAmount;
    this.submitparams = { ... this.submitparams };
    this.submitparams.step = parseInt(this.submitparams.step, 10) - 1;
    const backNavigationExtras: NavigationExtras = {
      queryParams: this.submitparams
    };
    if (this.submitparams.newurl) {
      if (this.totalSteps === 3) {
        this.router.navigate(['opportunities-amount'], backNavigationExtras);
      } else {
        this.router.navigate(['opportunities-address-confirm'], backNavigationExtras);
      }
    } else {
      if (this.totalSteps === 3) {
        this.router.navigate(['main/invest/investment-amount'], backNavigationExtras);
      } else {
        this.router.navigate(['main/invest/address-confirm'], backNavigationExtras);
      }
    }
  }

  gotoInvestmentConfirmation() {
    this.submitparams = { ... this.submitparams };
    this.submitparams.step = parseInt(this.submitparams.step, 10) + 1;
    const navigationExtras: NavigationExtras = {
      queryParams: this.submitparams
    };
    if (this.submitparams.newurl) {
      this.router.navigate(['opportunities-confirmation'], navigationExtras);
    } else {
      this.router.navigate(['main/invest/investment-confirmaiton'], navigationExtras);
    }
  }

}
