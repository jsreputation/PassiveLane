import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {PayService} from '../../../services/tabs/pay.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-cancel-pledge',
  templateUrl: './cancel-pledge.modal.html',
  styleUrls: ['./cancel-pledge.modal.scss'],
})
export class CancelPledgeComponent implements OnInit {

  public param;
  @Input() pledge_id: string;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private payService: PayService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  confirm() {
    this.param = {...this.authService.userInfo, pledge_id: this.pledge_id};
    this.payService.cancelPledge(this.param).subscribe((response) => {
      if (response.RESPONSECODE === 1) {
        console.log(response);
        this.modalCtrl.dismiss();
        this.router.navigate(['main/pay']);
      }
    });
  }

  async cancel() {
    await this.modalCtrl.dismiss();
  }

}
