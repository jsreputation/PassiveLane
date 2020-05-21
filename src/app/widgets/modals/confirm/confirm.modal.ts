import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.modal.html',
  styleUrls: ['./confirm.modal.scss'],
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
  }

    async gotoSignIn() {
    await this.modalCtrl.dismiss();
    setTimeout(() => {
      this.router.navigate(['sign-in']);
    }, 250);
  }

}
