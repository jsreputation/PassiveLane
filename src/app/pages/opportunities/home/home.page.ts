import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from '../../../services/UI/header.service';
import {MenuController} from '@ionic/angular';
import {InvestService} from '../../../services/tabs/invest.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';

  private hidden = false;
  private triggerDistance = 42;
  Params: string;

  private arrFilteredParams = [] as any;
  public arrSegments = [] as any;
  public checked = 0;
  public filteredName = '';
  is_verify = false;
  public duringFetching = true;
  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private menuCtrl: MenuController,
    private investService: InvestService,
    private authService: AuthService,
  ) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.Params = '';
    this.arrFilteredParams = [];
    this.is_verify = false;
    this.is_verify = this.authService.user_name_info.is_verify;
    this.investService.getAllDeals(this.authService.userInfo).subscribe(
      (result: any) => {
        this.duringFetching = false;
        if (result.RESPONSECODE === 1) {
          console.log(result);
          this.arrFilteredParams = result.data.deals;
          this.Params = this.filteredParams();
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
      { value: 1, label: 'Profit share', searchWord: 'Profit Share'},
      { value: 2, label: 'Equity', searchWord: 'Equity'},
    ];
  }

  segmentChanged(ev: any) {
    this.checked = ev.detail.value;
    this.filteredName = this.arrSegments[ev.detail.value].searchWord;
    this.Params = this.filteredParams();
  }

  filteredParams() {
    let tempArray = [];
    if (this.filteredName === '') {
      tempArray = this.arrFilteredParams;
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.arrFilteredParams.length; i++) {
        if (this.arrFilteredParams[i].type === this.filteredName) {
          tempArray.push(this.arrFilteredParams[i]);
        }
      }
    }
    return JSON.stringify(tempArray);
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
