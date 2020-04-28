import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth/auth.service';
import {HeaderService} from "../../services/UI/header.service";

@Component({
  selector: 'app-investor-type',
  templateUrl: './investor-type.page.html',
  styleUrls: ['./investor-type.page.scss'],
})
export class InvestorTypePage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public items = [
    {
      firstTxt: 'I am an',
      value: 'everyday',
      secondTxt: 'Everyday ',
      lastTxt: 'investor',
      contentTxt: 'I have little or no experience in early-stage investments',
      direction: 'left'
    },
    {
      firstTxt: 'I am an',
      value: 'advised',
      secondTxt: 'Advised ',
      lastTxt: 'investor',
      contentTxt: 'I have a financial advisor to give me advice about investments',
      direction: 'right'
    },
    {
      firstTxt: 'I am a',
      value: 'sophisticated',
      secondTxt: 'Sophisticated ',
      lastTxt: 'investor',
      contentTxt: 'I have invested in more than one unlisted company in the past 2 years',
      direction: 'left'
    },
    {
      firstTxt: 'I am a',
      value: 'high_net',
      secondTxt: 'High net ',
      lastTxt: 'investor',
      contentTxt: 'I have an annual income over £100k and/or assets over £250k',
      direction: 'right'
    },
  ];

  isUpdated = false;
  private hidden = false;
  private triggerDistance = 42;
  is_verify = false;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private router: Router,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.is_verify = false;
    this.is_verify = this.authService.user_name_info.is_verify;
    this.isUpdated = false;
    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params.isUpdated) {
          this.isUpdated = true;
        }
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

  fn_back() {
    this.router.navigate(['main/profile/']);
  }

  gotoQualificationCriteria(value, data) {
    console.log(data);

    let sendParams = {} as any;

    if (this.isUpdated) {
      sendParams = {
        investor_type: data,
        isUpdated: this.isUpdated
      };
    } else {
      sendParams = {
        investor_type: data,
      };
    }

    const navigationExtras: NavigationExtras = {
      queryParams: sendParams
    };

    switch (value) {
      case 'everyday':
        this.router.navigate(['experience-risk-awareness'], navigationExtras);
        break;
      case 'advised':
        this.router.navigate(['experience-risk-awareness'], navigationExtras);
        break;
      case 'sophisticated':
        this.router.navigate(['qualification-criteria'], navigationExtras);
        break;
      case 'high_net':
        this.router.navigate(['qualification-criteria'], navigationExtras);
        break;
      default:
        break;
    }

  }

}
