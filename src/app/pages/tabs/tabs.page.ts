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
    this.router.navigate(['main/my-deal']);
  }

  gotoInvest() {
    this.router.navigateByUrl('main/invest');
  }

  gotoActivity() {
    this.router.navigate(['main/activity']);
  }

  gotoPay() {
    this.router.navigate(['main/pay']);
  }

  gotoCacheout() {
    this.router.navigate(['main/cache-out']);
  }
}
