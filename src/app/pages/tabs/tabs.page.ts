import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, MenuController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('scrollArea', { read: IonContent, static: false }) tabContent: IonContent;

  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  gotoMyDeal() {
    this.router.navigate(['tabs/my-deal/']);
  }

  gotoInvest() {
    this.router.navigate(['tabs/invest/']);
  }

  gotoActivity() {
    this.router.navigate(['tabs/activity/']);
  }

  gotoPay() {
    this.router.navigate(['tabs/pay/']);
  }

  gotoCacheout() {
    this.router.navigate(['tabs/cache-out/']);
  }
}
