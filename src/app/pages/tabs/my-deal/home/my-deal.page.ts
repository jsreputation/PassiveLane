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
  private arrFilteredParams = [] as any;

  public arrSegments = [] as any;
  checked = 0;
  private filteredName = '';
  private subscribeData: any;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private dealsService: DealsService,
    private authService: AuthService,
  ) {
  }

  ionViewWillEnter() {
    this.myDealsParams = '';
    this.subscribeData = this.dealsService.getMyDeals(this.authService.userInfo).subscribe(
      (result: any) => {
        if (result.RESPONSECODE === 1) {
          this.arrFilteredParams = result.data.deals;
          console.log(result);

          this.myDealsParams = this.filteredParams();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.arrSegments = [
      { value: 0, label: 'All Deals', searchWord: ''},
      { value: 1, label: 'Open', searchWord: 'Open'},
      { value: 2, label: 'Close', searchWord: 'Closed'},
    ];
  }

  segmentChanged(ev: any) {
    this.checked = ev.detail.value;
    this.filteredName = this.arrSegments[ev.detail.value].searchWord;
    this.myDealsParams = this.filteredParams();
  }

  filteredParams() {
    let tempArray = [];
    if (this.filteredName === '') {
      tempArray = this.arrFilteredParams;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.arrFilteredParams.length; i++) {
        if (this.arrFilteredParams[i].status === this.filteredName) {
          tempArray.push(this.arrFilteredParams[i]);
        }
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
