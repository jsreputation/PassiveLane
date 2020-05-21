import {Component, Input, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-payment-sent',
  templateUrl: './payment-sent.modal.html',
  styleUrls: ['./payment-sent.modal.scss'],
})
export class ConfirmPaymentComponent implements OnInit {

  @Input() pledge: any;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
  }

  async gotoCashOut() {
    await this.modalCtrl.dismiss();
    const navigationExtras: NavigationExtras = {
      queryParams: this.pledge
    };
    await this.router.navigate(['main/pay/payment'], navigationExtras);
  }

}
