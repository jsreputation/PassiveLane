import {Injectable} from '@angular/core';
import {myEnterAnimation} from '../../animations/enter.animation';
import {myLeaveAnimation} from '../../animations/leave.animation';
import {ModalController} from '@ionic/angular';
import {VerifyModalComponent} from '../../modals/verify/verify.modal';

@Injectable({
  providedIn: 'root'
})

export class VerifyModalService {

  constructor(
    private modalCtrl: ModalController
  ) {
  }

  async showMdl(sendUrl, param) {
    const verifyMdl = await this.modalCtrl.create({
      component: VerifyModalComponent,
      cssClass: 'verify-modal',
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
      componentProps: {
        sendUrl,
        param
      }
    });
    await verifyMdl.present();
  }
}
