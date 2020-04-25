import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { InvestService } from 'src/app/services/tabs/invest.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/UI/header.service';

@Component({
  selector: 'app-your-investment',
  templateUrl: './your-investment.page.html',
  styleUrls: ['./your-investment.page.scss'],
})
export class YourInvestmentPage implements OnInit {
  completeData: any;
  submittedParams: any;
  private hidden = false;
  private triggerDistance = 42;
  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private investService: InvestService,
    private authService: AuthService,
    private renderer: Renderer2,
    private headerService: HeaderService
  ) {
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.getInvestCompleteData(params.pledge_id);
      }
    });
  }

  getInvestCompleteData(pledgeId) {
    const params = { ...this.authService.userInfo, pledge_id: pledgeId };
    this.investService.getInvestComplete(params).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.completeData = result.pledge;
      }
    });
  }

  fn_back() {
    delete this.submittedParams.pledge_id;
    this.submittedParams = { ... this.submittedParams };
    const backNavigationExtras: NavigationExtras = {
      queryParams: this.submittedParams
    };
    this.router.navigate(['main/invest/investment-confirmation'], backNavigationExtras);
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

  gotoPay() {
    this.router.navigate(['main/pay']);
  }
}
