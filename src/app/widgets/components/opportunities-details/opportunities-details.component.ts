import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Events} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth/auth.service';
import {InvestService} from 'src/app/services/tabs/invest.service';
import {HeaderService} from '../../../services/UI/header.service';

@Component({
  selector: 'app-opportunities-details',
  templateUrl: './opportunities-details.component.html',
  styleUrls: ['./opportunities-details.component.scss'],
})
export class OpportunitiesDetailsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('data') Params: any = [];
  all_deals: any[] = [];
  private temps: any[] = [];
  isReady = false;

  constructor(
    private router: Router,
    private events: Events,
  ) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.temps = [];
    this.all_deals = [];
    this.isReady = false;
    if (changes.Params.currentValue) {
      let dataParams: any;
      dataParams = JSON.parse(changes.Params.currentValue);
      dataParams.forEach(deal => {
        deal.target_amount = this.numberWithCommas(deal.target_amount);
        deal.total_pledged = this.numberWithCommas(deal.total_pledged);
        deal.raised_amount = this.numberWithCommas(deal.raised_amount);
      });
      this.temps = dataParams;
      this.listenToEvents();
      this.all_deals = this.temps;
      this.isReady = true;
    }
  }

  ngOnInit() {
  }

  listenToEvents() {
    this.events.subscribe('investSegment', (result) => {
      if (this.temps) {
        switch (result) {
          case '1':
            this.all_deals = this.temps;
            break;
          case '2':
            this.all_deals = [];
            // tslint:disable-next-line
            for (let i = 0; i < this.temps.length; i++) {
              if (this.temps[i].type === 'Profit Share') {
                this.all_deals.push(this.temps[i]);
              }
            }
            break;
          case '3':
            this.all_deals = [];
            // tslint:disable-next-line
            for (let i = 0; i < this.temps.length; i++) {
              if (this.temps[i].type === 'Equity') {
                this.all_deals.push(this.temps[i]);
              }
            }
            break;
          default:
            break;
        }
      }
    });
  }

  gotoMMTelecomRetail(id) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        deal_id: id,
      }
    };
    if (this.router.url === '/opportunities') {
      navigationExtras.queryParams['newurl'] = 1;
      this.router.navigate(['/opportunities-retail'], navigationExtras);
    } else {
      this.router.navigate(['main/invest/invest-mm-telecom-retail'], navigationExtras);
    }
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
