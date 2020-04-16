import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-your-investment',
  templateUrl: './your-investment.page.html',
  styleUrls: ['./your-investment.page.scss'],
})
export class YourInvestmentPage implements OnInit {

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
  ) {
  }

  ionViewWillEnter() {
  }

  ngOnInit() {
  }

  gotoPay() {
    this.router.navigate(['tabs/pay']);
  }
}
