import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from '../../../services/UI/header.service';
import {InvestService} from '../../../services/tabs/invest.service';
import {MenuController} from '@ionic/angular';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-opportunities-retail',
    templateUrl: './opportunities-retail.page.html',
    styleUrls: ['./opportunities-retail.page.scss'],
})
export class OpportunitiesRetailPage implements OnInit {

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
        private menuCtrl: MenuController,
        private investService: InvestService,
        private authService: AuthService,
    ) {
    }


    ionViewWillEnter() {
        this.detail = {};
        this.retail_params = '';
        this.isReady = false;

        this.investService.getInvestDeal(this.queryParams).subscribe(
            result => {
                if (result.RESPONSECODE === 1) {
                    result.data.deal.forEach(deal => {
                        deal.target_amount = this.numberWithCommas(deal.target_amount);
                        deal.total_pledged = this.numberWithCommas(deal.total_pledged);
                        deal.raised_amount = this.numberWithCommas(deal.raised_amount);

                    });
                    this.detail = result.data.deal[0];
                    this.retail_params = JSON.stringify(result.data.deal[0]);
                    this.isReady = true;
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params) {
                params = {...params, ...this.authService.userInfo};
                this.deal_info = params;
                this.queryParams = params;
            }
        });
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
        this.router.navigate(['opportunities']);
    }

    gotoInvestmentAmount() {
        this.deal_info = { ... this.deal_info, newurl: 1 };
        const navigationExtras: NavigationExtras = {
            queryParams: this.deal_info
        };
        this.router.navigate(['opportunities-amount'], navigationExtras);
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
}
