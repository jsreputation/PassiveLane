import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InvestService } from 'src/app/services/tabs/invest.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {
  @Input() deal: any;
  @Input() params: any;
  user_type: '';
  bankDetails: any;
  constructor(
      private modalCtrl: ModalController,
      private investService: InvestService
  ) { }

  ngOnInit() {

    this.getBankDetails();
  }

  getBankDetails() {
    this.investService.getBankDetails(this.params).subscribe((result) => {
      if (result.RESPONSECODE === 1) {
        console.log(result);
        this.bankDetails = result.pledge.bank;
      } else {

      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
