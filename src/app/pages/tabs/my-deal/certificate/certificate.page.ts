import { Component, OnInit } from '@angular/core';
import { DealsService } from 'src/app/services/tabs/deals.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
})
export class CertificatePage implements OnInit {
  title = 'Certificate Details';
  certificateDetails: any;
  constructor(
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.getCertificateDetails(this.navParams.data);
  }

  getCertificateDetails(params) {
    const finalParam = { ...this.authService.userInfo,
      certificate_id: params.certificate_id,
      incoming_id: params.incoming_id
      // pledge_id: 227
    };
    this.dealsService.getCertificateDetails(finalParam).subscribe((result) => {
      console.log(result);
      if (result.RESPONSECODE === 1) {
        this.certificateDetails = result.data;
      } else {
        this.certificateDetails = '';
      }
    }, err => {
      alert('Server Api Problem');
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
