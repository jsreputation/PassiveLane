import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvestService } from 'src/app/services/tabs/invest.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HeaderService } from 'src/app/services/UI/header.service';
import { myLeaveAnimation } from 'src/app/widgets/animations/leave.animation';
import { myEnterAnimation } from 'src/app/widgets/animations/enter.animation';
import { BankInfoComponent } from 'src/app/widgets/modals/bank-info/bank-info.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-your-investment',
  templateUrl: './your-investment.page.html',
  styleUrls: ['./your-investment.page.scss'],
})
export class YourInvestmentPage implements OnInit {
  completeData: any;
  submittedParams: any;
  private hidden = false;
  private triggerDistance = 42;
  pledge_id: number;
  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private investService: InvestService,
    private authService: AuthService,
    private renderer: Renderer2,
    private headerService: HeaderService,
    private modalCtrl: ModalController
  ) {
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.pledge_id = params.pledge_id;
        this.getInvestCompleteData(params.pledge_id);
      }
    });
  }

  getInvestCompleteData(pledgeId) {
    const params = { ...this.authService.userInfo, pledge_id: pledgeId };
    this.investService.getInvestComplete(params).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.completeData = result.pledge;
      }
    });
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

  gotoPay() {
    this.router.navigate(['main/pay']);
  }

  async showBankDetailModal() {
    const submitParam = {...this.authService.userInfo, pledge_id: this.pledge_id};
    const modal = await this.modalCtrl.create({
        component: BankInfoComponent,
        cssClass: 'bankInfo-modal',
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps: {
            params: submitParam,
            deal: this.completeData
        }
    });
    await modal.present();
}
}
