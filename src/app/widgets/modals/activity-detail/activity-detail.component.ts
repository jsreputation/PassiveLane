import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import {DealsService} from '../../../services/tabs/deals.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-activity-detail',
    templateUrl: './activity-detail.component.html',
    styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {

    @Input() deal_id: any;
    @Input() amount: any;
    deal = {} as any;

    private dealInfo = {} as any;

    constructor(
        private modalCtrl: ModalController,
        private router: Router,
        private dealsService: DealsService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.dealsService.getMyDeals(this.authService.userInfo).subscribe(res => {
            if (res.RESPONSECODE === 1) {
                this.dealInfo = this.filteredParams(res.data.deals).then(result => {
                    this.deal = result;
                    console.log(result);
                });
            } else {
                console.log('error : ', res);
            }
        });
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    gotoViewDeal() {
        this.closeModal();
        const navigationExtras: NavigationExtras = {
            queryParams: this.deal
        };
        this.router.navigate(['main/my-deal/mm-telecom-retail'], navigationExtras);
    }

    filteredParams(data: any) {
        return new Promise((resolve) => {
            let temp = {};
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
                if (data[i].deal_id === this.deal_id) {
                  data[i].invested = this.numberWithCommas(data[i].invested);
                  data[i].tot_roi = this.numberWithCommas(data[i].tot_roi);
                  data[i].last_roi = this.numberWithCommas(data[i].last_roi);
                  data[i].balance = this.numberWithCommas(data[i].balance);
                  temp = data[i];
                }
            }
            resolve(temp);
        });
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

}
