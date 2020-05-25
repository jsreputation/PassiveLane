import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from 'src/app/services/UI/header.service';
import {InvestService} from '../../../../services/tabs/invest.service';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.page.html',
  styleUrls: ['./invest.page.scss'],
})
export class InvestPage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';

  private hidden = false;
  private triggerDistance = 42;
  Params: string;

  public arrSegments = [] as any;
  public checked = 0;
  public filteredName = '';
  public duringFetching = true;
  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private investService: InvestService,
    private authService: AuthService,
  ) {
  }

  ionViewWillEnter() {
    this.Params = '';
    this.filteredParams(this.filteredName, this.authService.userInfo);
  }

  ngOnInit() {
    this.arrSegments = [
      {value: 0, label: 'All Deals', searchWord: 'alldeals'},
      {value: 1, label: 'Profit share', searchWord: 'profitsharedeals'},
      {value: 2, label: 'Equity', searchWord: 'equitydeals'},
    ];
  }

  segmentChanged(ev: any) {
    this.checked = ev.detail.value;
    this.filteredName = this.arrSegments[ev.detail.value].searchWord;
    this.filteredParams(this.filteredName, this.authService.userInfo);
  }

  filteredParams(filterName: string, userInfo: object) {
    if (filterName === '') {
      filterName = 'alldeals';
    }
    this.Params = '';
    this.duringFetching = true;
    this.investService.getDeals(filterName, userInfo).subscribe(
      (result: any) => {
        this.duringFetching = false;
        if (result.RESPONSECODE === 1) {
          console.log('invest data : ', result);
          this.Params = JSON.stringify(result.data.deals);
        }
      },
      error => {
        console.log(error);
        this.Params = '';
      }
    );
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
}
