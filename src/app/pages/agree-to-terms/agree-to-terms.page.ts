import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from 'src/app/services/UI/header.service';
import {MenuController} from '@ionic/angular';
import {InitialQuizService} from 'src/app/services/profile/initial-quiz.service';
import {Storage} from '@ionic/storage';
import {AuthService} from 'src/app/services/auth/auth.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-agree-to-terms',
  templateUrl: './agree-to-terms.page.html',
  styleUrls: ['./agree-to-terms.page.scss'],
})
export class AgreeToTermsPage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';

  private hidden = false;
  private triggerDistance = 42;
  private backUrl = '';
  private backParams: any;
  private submitParams = {} as any;

  is_verify = false;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private router: Router,
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    private intialQuizService: InitialQuizService,
    private storage: Storage,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.is_verify = false;
    this.is_verify = this.authService.user_name_info.is_verify;
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.investor_type) {
        switch (params.investor_type) {
          case 'Everyday investor':
            const navigationExtras: NavigationExtras = {
              queryParams: {
                investor_type: params.investor_type,
                isUpdated: params.isUpdated
              }
            };
            this.backParams = navigationExtras;
            break;
          case 'Advised investor':
            const backAInavigationExtras: NavigationExtras = {
              queryParams: {
                investor_type: params.investor_type,
                isUpdated: params.isUpdated
              }
            };
            this.backParams = backAInavigationExtras;
            break;
          case 'Sophisticated investor':
            const backSInavigationExtras: NavigationExtras = {
              queryParams: {
                investor_type: params.investor_type,
                qualification_criteria1: params.qualification_criteria1,
                qualification_criteria2: params.qualification_criteria2,
                qualification_criteria3: params.qualification_criteria3,
                qualification_criteria4: params.qualification_criteria4,
                isUpdated: params.isUpdated
              }
            };
            this.backParams = backSInavigationExtras;
            break;
          case 'High net investor':
            const backHNnavigationExtras: NavigationExtras = {
              queryParams: {
                investor_type: params.investor_type,
                qualification_criteria5: params.qualification_criteria5,
                qualification_criteria6: params.qualification_criteria6,
                isUpdated: params.isUpdated
              }
            };
            this.backParams = backHNnavigationExtras;
            break;
          default:
            break;
        }

        this.backUrl = 'experience-risk-awareness';
        this.submitParams = {...params};
      }
    });
  }

  fn_back() {
    this.router.navigate([this.backUrl], this.backParams);
  }

  gotoTabs() {
    this.submitParams.agree_term = 1;
    this.submitParams.added_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
    this.submitParams.user_id = this.authService.userInfo.user_id;
    this.submitParams.token = this.authService.userInfo.token;
    console.log(this.submitParams);
    this.intialQuizService.sendProfileInfo(this.submitParams).subscribe(
      result => {
        console.log('result => ', result);
        if (result.RESPONSECODE === 1) {
          this.updateStorage();
        } else {
          console.log('RESPONSECODE : 0');
        }
      },
      error => {
        console.log('error => ', error);
        console.log('Error msg');
      }
      );
  }

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.is_onboarding = true;
      this.authService.is_onboarding = true;
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      })
    })
  }

}
