import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {Camera} from '@ionic-native/camera/ngx';
import {HeaderService} from 'src/app/services/UI/header.service';
import {AuthService} from 'src/app/services/auth/auth.service';
import {PayService} from 'src/app/services/tabs/pay.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {


  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  ScrollAnimation = '';
  img: any = '';
  no = 0;
  private hidden = false;
  private triggerDistance = 42;
  pledges: any[];
  isReady = false;
  pledgeInfo = {} as any;

  private arrFilteredParams = [] as any;

  arrSegments = [] as any;
  checked = 0;
  private filteredName = '';

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private router: Router,
    private modalCtrl: ModalController,
    private camera: Camera,
    private authService: AuthService,
    private payService: PayService,
  ) {
  }

  ngOnInit() {
    this.arrSegments = [
      // { value: 0, label: 'All Pledges', searchWord: ''},
      { value: 0, label: 'Open', searchWord: 'Open'},
      { value: 1, label: 'Closed', searchWord: 'Close'},
    ];
  }

  _initializePledges() {
    this.pledges = {} as any;
    this.isReady = false;
    this.payService.getAllPledges(this.authService.userInfo).subscribe(
      result => {
        if (result) {
          this.arrFilteredParams = result.pledge;
          this.pledges = {...result}.pledge;
          this.filteredName = 'Open';
          this.pledges = this.filteredParams();
          console.log(this.pledges);
          this.isReady = true;
        } else {
          console.log('RESPONSECODE : 0');
        }
      },
      error => {
        console.log('error => ', error);
      }
    );
  }

  ionViewWillEnter() {
    this._initializePledges();
  }

  ionViewWillLeave() {
    if (!this.hidden) {
      this.headerService.headerClear(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }

  segmentChanged(ev: any) {
    this.checked = ev.detail.value;
    this.filteredName = this.arrSegments[ev.detail.value].searchWord;
    this.pledges = this.filteredParams();
    console.log(this.pledges.length);
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
    return tempArray;
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

  gotoPayment(pledgeId, status) {
    if (status !== 'Close') {
      this.pledgeInfo = {...this.authService.userInfo, pledge_id: pledgeId};
      const navigationExtras: NavigationExtras = {
        queryParams: this.pledgeInfo
      };
      this.router.navigate(['main/pay/payment'], navigationExtras);
    }
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
