import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from 'src/app/services/UI/header.service';
import {DealsService} from '../../../../services/tabs/deals.service';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-my-deal',
  templateUrl: './my-deal.page.html',
  styleUrls: ['./my-deal.page.scss'],
})
export class MyDealPage implements OnInit {


  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';

  private hidden = false;
  private triggerDistance = 42;

  public myDealsParams = '';
  public arrFilteredParams = [] as any;

  public arrSegments = [] as any;
  checked = 1;
  private filteredName = 'Open';
  private subscribeData: any;
  public duringFetching = true;
  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private dealsService: DealsService,
    private authService: AuthService,
  ) {
  }

  ionViewWillEnter() {
    this.duringFetching = true;
    this.myDealsParams = '';
    this.subscribeData = this.dealsService.getMyDeals(this.authService.userInfo).subscribe(
      (result: any) => {
        console.log('============', result);
        this.duringFetching = false;
        if (result.RESPONSECODE === 1) {
          this.arrFilteredParams = result.data.deals;
          this.defineFilterType(result.data.deals).then((res) => {
            this.myDealsParams = this.filteredParams();
          }).catch((err) => {
            this.checked = 2;
            this.filteredName = 'Closed';
            this.myDealsParams = this.filteredParams();
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.arrSegments = [
      // { value: 0, label: 'All Deals', searchWord: ''},
      { value: 1, label: 'Open', searchWord: 'Open'},
      { value: 2, label: 'Closed', searchWord: 'Closed'},
    ];
  }

  async defineFilterType(deals) {
    return new Promise((resolve, reject) => {
      deals.forEach(element => {
        if (element.deal_status === 'Open') {
          resolve(true);
        }
      });
      reject(false);
    });
  }

  segmentChanged(ev: any) {
    this.checked = parseInt(ev.detail.value, 10);
    this.filteredName = this.arrSegments[parseInt(ev.detail.value, 10) - 1].searchWord;
    this.myDealsParams = this.filteredParams();
  }

  filteredParams() {
    const tempArray = [];
      // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.arrFilteredParams.length; i++) {
      if (this.arrFilteredParams[i].deal_status === this.filteredName) {
        tempArray.push(this.arrFilteredParams[i]);
      }
    }
    return JSON.stringify(tempArray);
  }


  ionViewWillLeave() {
    this.subscribeData.unsubscribe();
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
