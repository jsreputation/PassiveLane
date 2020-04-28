import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {MenuController} from '@ionic/angular';
import {Storage} from "@ionic/storage";

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
    {title: 'Amount invested: ', content: 'EIO,OOO'},
    {title: 'Investment type:  ', content: 'Profit share '},
    {title: 'Date Of investment:  ', content: '4 July 2019'},
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

  updateStorage() {
    this.storage.get('current_user').then(res => {
      res.data.user_info.deals_added = true;
      this.authService.deals_added = true;
      this.storage.set('current_user', res).then(result => {
        console.log('set_result : ', result);
        setTimeout(() => {
          this.authService.ifLoggedIn();
        }, 500);
      })
    })
  }

}
