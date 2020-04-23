import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DealsService } from 'src/app/services/tabs/deals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/services/UI/header.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.page.html',
  styleUrls: ['./certificate.page.scss'],
})
export class CertificatePage implements OnInit {
  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;
  title = 'Certificate Details';
  private hidden = false;
  private triggerDistance = 42;
  certificateDetails: any;
  constructor(
    private dealsService: DealsService,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      if (params) {
        this.getCertificateDetails(params);
      }
    });
  }

  getCertificateDetails(params) {
    const finalParam = { ...this.authService.userInfo,
      certificate_id: params.certificate_id,
      pledge_id: params.pledge_id
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

  scroll(ev: any) {
    if (!this.hidden && ev.detail.currentY > this.triggerDistance) {
        this.hidden = true;
        return this.headerService.headerHide(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    } else if (this.hidden && ev.detail.currentY <= this.triggerDistance) {
        this.hidden = false;
        return this.headerService.headerShow(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
    }
  }

  fn_back() {
    this.navCtrl.back();
  }

}
