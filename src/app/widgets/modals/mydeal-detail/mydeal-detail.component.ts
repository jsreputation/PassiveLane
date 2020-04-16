import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

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

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

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
