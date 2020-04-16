import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {

  @Input() bankDetail: any;
  @Input() deal: any;
  user_type: '';

  constructor(
      private authService: AuthService,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    console.log('bankDetail : ', this.bankDetail);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
