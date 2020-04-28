import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';
import {DealsService} from '../../../services/tabs/deals.service';

@Component({
  selector: 'app-contract-pay-info',
  templateUrl: './contract-pay-info.component.html',
  styleUrls: ['./contract-pay-info.component.scss'],
})
export class ContractPayInfoComponent implements OnInit, OnDestroy {

  @Input() deal: any;
  user_type: '';
  contractDetail = {} as any;
  contractInfo: any;

  constructor(
      private modalCtrl: ModalController,
      private authService: AuthService,
      private dealsService: DealsService,
      private navParams: NavParams
  ) { }

  ngOnInit() {
    this.user_type = this.authService.user_name_info.user_type;
    console.log(this.navParams.data.deal);
    if (this.navParams.data.deal) {
      const submitParam = {...this.authService.userInfo, contract_id: this.navParams.data.deal.contract_id };
      this.contractInfo = this.dealsService.getContractInfo(submitParam).subscribe(
        (result) => {
          console.log(result);
          if (result.RESPONSECODE === 1) {
            this.contractDetail = result.data;
          } else {
            this.contractDetail['text'] = '<div class="no-data">No contract available</div>';
          }
        },
        (error) => {
          console.log(error);
        });
    }
    // const submitParam = {...this.authService.userInfo, deal_id: this.deal.deal_id, transaction_id: this.deal.transaction_id };
  }

  ngOnDestroy() {

  }

  share() {
    // const subject = 'Contract Information';
    // const msg = 'If you want to check the contract information please click under the url.';
    // this.socialSharing.share(msg, subject, '', this.contractDetail.pdf_url).then(() => {
    //   Sharing via email is possible
    // }).catch(() => {
    //   Sharing via email is not possible
    // });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
