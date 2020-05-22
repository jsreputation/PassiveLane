import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {MenuController} from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-opportunities-your-investment',
  templateUrl: './opportunities-your-investment.page.html',
  styleUrls: ['./opportunities-your-investment.page.scss'],
})
export class OpportunitiesYourInvestmentPage implements OnInit {

  public items = [
    {
      firstTxt: 'How to ',
      secondTxt: 'complete  ',
      lastTxt: 'your investment',
      description: 'TO complete your investment, please transfer £1O,OOO to: '
    },
  ];
  public investmentDetails = [
    {title: 'Investment Status: ', content: 'Awaiting payment'},
    {title: 'Round Status: ', content: 'Live'},
    {title: 'Round invested in: ', content: 'MM Telecom Retail'},
    {title: 'Amount invested: ', content: '£1O,OOO'},
    {title: 'Investment type:  ', content: 'Profit share '},
    {title: 'Date Of investment:  ', content: this.customizeDate()},
    {title: 'Round pitch: ', content: 'original pitch page'},
    {title: 'Payment method: ', content: 'Bank transfer'},
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private storage: Storage
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
  }

  gotoPay() {
    this.updateStorage();
  }

  customizeDate(): string {
    // tslint:disable-next-line: no-var-keyword
    const today = new Date();
    // tslint:disable-next-line: no-var-keyword
    var dd = today.getDate().toString();
    // tslint:disable-next-line: no-var-keyword
    var mm = (today.getMonth() + 1).toString();
    const yyyy = today.getFullYear();
    if (parseInt(dd, 10) < 10) {
      dd = '0' + dd;
    }

    if (parseInt(mm, 10) < 10) {
      mm = '0' + mm;
    }
    const result = mm + ' ' + dd + ' ' + yyyy;
    return result;
  }

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.deals_added = true;
      this.authService.deals_added = true;
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      });
    });
  }

}
