import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from 'src/app/services/UI/header.service';
import {InvestService} from 'src/app/services/tabs/invest.service';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
    selector: 'app-invest-mm-telecom-retail',
    templateUrl: './invest-mm-telecom-retail.page.html',
    styleUrls: ['./invest-mm-telecom-retail.page.scss'],
})
export class InvestMmTelecomRetailPage implements OnInit {

    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;

    public ScrollAnimation = '';
    public detail = {} as any;
    public retail_params = '';
    private hidden = false;
    private triggerDistance = 42;
    public deal_info: any;
    public isReady = false;
    private queryParams = {} as any;

    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        public route: ActivatedRoute,
        private investService: InvestService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params) {
                console.log(params);
                params = {...params, ...this.authService.userInfo};
                this.deal_info = params;
                this.queryParams = params;
                this.getInvestDetails();
            }
        });
    }

    getInvestDetails() {
        this.detail = {};
        this.retail_params = '';
        this.isReady = false;

        this.investService.getInvestDeal(this.queryParams).subscribe(
            result => {
                if (result.RESPONSECODE === 1) {
                    result.data.deal.map(deal => {
                        deal.target_amount = this.numberWithCommas(deal.target_amount);
                        deal.total_pledged = this.numberWithCommas(deal.total_pledged);
                        deal.raised_amount = this.numberWithCommas(deal.raised_amount);
                    });
                    this.deal_info.type = result.data.deal[0].type;
                    // tslint:disable-next-line: no-string-literal
                    this.deal_info['dealName'] = this.detail.deal_name;
                    this.detail = result.data.deal[0];
                    this.retail_params = JSON.stringify(result.data.deal[0]);
                    this.isReady = true;
                } else {
                    console.log('RESPONSECODE : 0');
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    ionViewWillLeave() {
        if (!this.hidden) {
            this.headerService.headerClear(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
        }
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
        if (this.deal_info.newurl) {
            this.router.navigate(['opportunities']);
        } else {
            this.router.navigate(['main/invest/']);
        }
    }

    gotoInvestmentAmount() {
        // tslint:disable-next-line: no-string-literal
        this.deal_info['dealName'] = this.detail.deal_name;
        const navigationExtras: NavigationExtras = {
            queryParams: this.deal_info
        };
        if (this.deal_info.newurl) {
            this.router.navigate(['opportunities-amount'], navigationExtras);
        } else {
            this.router.navigate(['main/invest/investment-amount'], navigationExtras);
        }
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
}
