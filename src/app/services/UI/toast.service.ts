import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private toastController: ToastController
  ) { }

  async presentToast(data: any, type: any) {
    let header_icon, bg_color, header_title = '';

    if (type === 'danger') {
      header_icon = 'alert';
      bg_color = 'danger';
      header_title = 'Error!';
    } else if (type === 'all') {
      if (data.RESPONSECODE === 1) {
        header_icon = 'checkmark-circle';
        bg_color = 'success';
        header_title = 'Success!';
      } else {
        header_icon = 'alert';
        bg_color = 'danger';
        header_title = 'Error!';
      }
    } else if (type === 'warning') {
      header_icon = 'alert';
      bg_color = 'warning';
      header_title = 'Warning!';
    }

    const toast = await this.toastController.create({
      header: header_title,
      message: data.RESPONSE,
      duration: 2000,
      position: 'top',
      color: bg_color,
      buttons: [
        {
          side: 'start',
          icon: header_icon,
          handler: () => {
            console.log('Header Icon clicked');
          }
        }, {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
  }

  async presentSpecificText(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      mode: 'ios',
      position: 'top'
    });
    await toast.present();
  }
 }
