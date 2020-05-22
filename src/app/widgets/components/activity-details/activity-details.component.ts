import {Component, Input, OnInit} from '@angular/core';
import {myEnterAnimation} from '../../animations/enter.animation';
import {myLeaveAnimation} from '../../animations/leave.animation';
import {ModalController} from '@ionic/angular';
import {ContractPayInfoComponent} from '../../modals/contract-pay-info/contract-pay-info.component';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss'],
})
export class ActivityDetailsComponent implements OnInit {

  @Input() deals = [] as any;
  @Input() isReadyAmounts = false;
  @Input() showDealName: boolean;
  constructor(
      private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    console.log(this.deals);
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',').trim();
    return parts.join('.');
  }

  async showContractPayDetail(data: any) {
    if (data.type !== 'Withdraw') {
      const modal = await this.modalCtrl.create({
        component: ContractPayInfoComponent,
        cssClass: 'contractPaymentInfo-modal',
        enterAnimation: myEnterAnimation,
        leaveAnimation: myLeaveAnimation,
        componentProps: {
          deal: data
        }
      });
      await modal.present();
    }
  }

}
