import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from '../../../services/UI/header.service';

@Component({
  selector: 'app-opportunities-payment-options',
  templateUrl: './opportunities-payment-options.page.html',
  styleUrls: ['./opportunities-payment-options.page.scss'],
})
export class OpportunitiesPaymentOptionsPage implements OnInit {

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
  private submitparams: any;

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
    const backNavigationExtras: NavigationExtras = {
      queryParams: this.submitparams
    };
    this.router.navigate(['opportunities-amount'], backNavigationExtras);
  }

  gotoInvestmentConfirmation() {
    const navigationExtras: NavigationExtras = {
      queryParams: this.submitparams
    };
    this.router.navigate(['opportunities-confirmation'], navigationExtras);
  }

}
