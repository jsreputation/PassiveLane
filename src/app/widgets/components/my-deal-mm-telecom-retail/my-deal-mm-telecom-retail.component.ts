import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';


@Component({
  selector: 'app-my-deal-mm-telecom-retail',
  templateUrl: './my-deal-mm-telecom-retail.component.html',
  styleUrls: ['./my-deal-mm-telecom-retail.component.scss'],
})
export class MyDealMmTelecomRetailComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input('data') Params: any = [];
  // tslint:disable-next-line: no-input-rename
  @Input('plength') plength: number;
  myDeals: any = [];
  isReady = false;

  constructor(
    private router: Router,
  ) {}

  ionViewWillEnter(changes: SimpleChanges) {
    console.log('ngOnChanges ...');
  }

  ngOnChanges(changes: SimpleChanges) {
    this.myDeals = [];
    this.isReady = false;
    if (changes.Params.currentValue) {
      let dataParam: any;
      dataParam = JSON.parse(changes.Params.currentValue);
      dataParam.forEach(deal => {
        deal.invested = this.numberWithCommas(deal.invested);
        deal.tot_roi = this.numberWithCommas(deal.tot_roi);
        deal.last_roi = this.numberWithCommas(deal.last_roi);
        deal.balance = this.numberWithCommas(deal.balance);
      });
      this.myDeals = dataParam;
      this.isReady = true;
      if (dataParam[0].deal_status === 'Open' && this.plength === 1) {
        this.gotoMMTelecomRetail(this.myDeals[0]);
      }
    } else {
      // this.isReady = true;
    }
  }

  ngOnInit() {
  }

  gotoMMTelecomRetail(deal) {
    const navigationExtras: NavigationExtras = {
      queryParams: deal
    };
    this.router.navigate(['main/my-deal/mm-telecom-retail'], navigationExtras);
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
