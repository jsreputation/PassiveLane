import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {MenuController} from '@ionic/angular';
import {HeaderService} from 'src/app/services/UI/header.service';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-qualification-criteria',
  templateUrl: './qualification-criteria.page.html',
  styleUrls: ['./qualification-criteria.page.scss'],
})
export class QualificationCriteriaPage implements OnInit {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  nextAvailable: boolean = false;
  ScrollAnimation = '';
  qualificationCriterias = [];
  private hidden = false;
  private triggerDistance = 42;
  private invester_param: any;
  private sendParams = {};
  qualificationCriterias_descriptions = [];
  private backParams = {} as any;

  is_verify = false;

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private router: Router,
    private menuCtrl: MenuController,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    this.is_verify = false;
    this.is_verify = this.authService.user_name_info.is_verify;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.investor_type) {
        this.invester_param = params.investor_type;
        this.backParams.isUpdated = params.isUpdated;
        switch (this.invester_param) {
          case 'Sophisticated investor':
            this.qualificationCriterias = [
              {
                id: 1,
                val: 'I am a member of a network or syndicate of business angels, and have been so far at least the last 6 months.',
                isChecked: false
              },
              {
                id: 2,
                val: 'I am working, or have worked in the past 2 years, in a professional capacity in the private equity sector, or in the provision of finance for small and medium enterprises.',
                isChecked: false
              },
              {id: 3, val: 'I have made more than one investment in a unlisted company in the past 2 years.', isChecked: false},
              {
                id: 4,
                val: 'I am currently, or have been in the past 2 years, a director of a company with an annual turnover of at least EI million.',
                isChecked: false
              }
            ];
            this.qualificationCriterias_descriptions = [];
            break;
          case 'High net investor':
            this.qualificationCriterias = [
              {
                turn: 4,
                id: 5,
                val: 'I had, during the precedding financial year, an anual to the value of £100,000 or more',
                isChecked: false
              },
              {
                turn: 4,
                id: 6,
                val: 'I held, throughout the preceeding finacial year, net assets to the value of £250,000 or more. Net assets for the these purposes do not include',
                isChecked: false
              },
            ];
            this.qualificationCriterias_descriptions = [
              'the property which is my primary residence or any loan secured on that residence',
              'any right of mine under a qualifying contact of the insurance with in the meaning of the Financial Services and Markets Act 2000 (Regulated Activities) Order 2001',
              'any benifits (in the form of pensions or otherwise) which are payable on the termination of my service on my death or retirement and to which I am (or my dependants are), or maybe, entired',
            ];
            break;
          default:
            this.qualificationCriterias = [];
            this.qualificationCriterias_descriptions = [];
            break;
        }
        // tslint:disable-next-line:forin
        for (const key in params) {
          this.sendParams[key] = params[key];
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
    const navigationExtras: NavigationExtras = {
      queryParams: this.backParams
    };
    this.router.navigate(['investor-type'], navigationExtras);
  }

  onSelect(isChecked, id, turn) {
    if (turn === 4) {
      return this.qualificationCriterias[id - 5].isChecked = isChecked;
    }
    this.qualificationCriterias[id - 1].isChecked = isChecked;
    this.checkNextAvailable();
  }

  gotoExperience_RiskAwareness() {
    for (let i = 0; i < this.qualificationCriterias.length; i++) {
      this.sendParams['qualification_criteria' + this.qualificationCriterias[i].id] = this.qualificationCriterias[i].isChecked;
    }
    console.log(this.sendParams);
    const navigationExtras: NavigationExtras = {
      queryParams: this.sendParams
    };
    this.router.navigate(['experience-risk-awareness'], navigationExtras);
  }

  checkNextAvailable() {
    this.nextAvailable = false;
    this.qualificationCriterias.forEach((element) => {
      if (element.isChecked) {
        this.nextAvailable  = true;
      }
    });
  }
}
