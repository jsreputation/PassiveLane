import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mydeal-detail',
  templateUrl: './mydeal-detail.component.html',
  styleUrls: ['./mydeal-detail.component.scss'],
})
export class MydealDetailComponent implements OnInit {

  @Input() deal_name: string;
  @Input() invested: string;
  @Input() tot_roi: string;
  @Input() last_roi: string;
  @Input() tot_withdrawn: string;
  @Input() balance: string;
  @Input() status: string;
  @Input() logo_image: string;
  @Input() sum_amount: string;

  deal_type: number;
  noOfShares: number;
  sharePrice: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params.deal_type === 'Equity') {
        this.deal_type = 1;
        this.noOfShares = parseInt(params.total_shares, 10);
        this.sharePrice = parseFloat(params.share_price);
      } else {
        this.deal_type = 0;
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  numberWithCommas(x) {
    console.log(x);
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
}
