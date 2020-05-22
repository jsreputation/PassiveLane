import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from '../../../services/UI/header.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {InvestService} from '../../../services/tabs/invest.service';

@Component({
    selector: 'app-opportunities-amount',
    templateUrl: './opportunities-amount.page.html',
    styleUrls: ['./opportunities-amount.page.scss'],
})
export class OpportunitiesAmountPage implements OnInit {

    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;

    public ScrollAnimation = '';
    deal_info: any;
    public steps = 2;
    public isError = false;
    public isValidError = false;
    private hidden = false;
    private triggerDistance = 42;
    private investment_amount: number;
    public amountVal = 0;
    public sumAmount = '';
    investimentDetails = {} as any;
    private queryParams = {} as any;

    constructor (
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        public route: ActivatedRoute,
        private investService: InvestService
    ) {

    }

    ionViewWillEnter() {
        this.investService.getinvestmentdetails(this.queryParams).subscribe(res => {
            if (res.RESPONSECODE === 1) {
                console.log(res.data);
                this.investimentDetails = res.data;
            }
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params) {
                this.deal_info = [] as any;
                console.log(params);
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

    fn_focus(event, min, max) {
        if (event.srcElement.value === '') {
            this.isError = true;
            this.investment_amount = null;
            this.amountVal = 0;
            this.sumAmount = '';
            this.isValidError = true;
        } else {
            this.isError = false;
            this.investment_amount = event.srcElement.value;
            this.validAmount(event.srcElement.value, min, max);
            this.isValidError = false;
        }
    }

    userTyping(val, min, max) {
        this.amountVal = val;
        this.sumAmount = '';
        this.validAmount(val, min, max);
    }

    validAmount(val, min, max) {
        if (this.cvm(min) < this.cvm(val) && this.cvm(val) < this.cvm(max)) {
            console.log(this.cvm(min), this.cvm(val));
            this.amountVal = this.cvm(val);
            this.sumAmount = this.sumAmountInYear();
            this.isValidError = false;
        } else {
            this.isValidError = true;
        }
    }

    cvm(val) {
        const temp = Math.abs(val.replace(',', '') * 1);
        return temp;
    }

    sumAmountInYear() {
        let sumResult = 0;
        if (this.investimentDetails.roi_percentage) {

            let limitPerYear = 1;
            let durationType = this.investimentDetails.contract_duration.split(' ')[1];
            let durationVal = this.investimentDetails.contract_duration.split(' ')[0];
            if (!durationType) {
                durationType = this.investimentDetails.contract_duration.split(' ')[0];
                durationVal = 1;
            }
            console.log('durationType : ', durationType);
            console.log('durationVal : ', durationVal);
            limitPerYear = this.getAmountLimitPerYear(durationType, durationVal);
            console.log('limitPerYear : ', limitPerYear);

            const rate = 1 + parseFloat(this.investimentDetails.roi_percentage) / 100;

            for (let i = 1; i < limitPerYear; i++) {
                sumResult += this.amountVal * (Math.pow(rate, i));
            }
        }
        if (this.investimentDetails.share_price) {
            const rate = 1 + parseFloat(this.investimentDetails.share_price) / 100;
            sumResult = this.amountVal * (Math.pow(rate, 1));
            //
            // for (let i = 1; i < 12; i++) {
            //     sumResult += this.amountVal * (Math.pow(rate, i));
            // }
        }
        return this.numberWithCommas(sumResult);
    }


    getAmountLimitPerYear(type, val) {
        let limitCount = 1;
        switch (type) {
            case 'Year' : limitCount = 1 / val; break;
            case 'Yearly' : limitCount = 1; break;
            case 'Years' : limitCount = 1 / val; break;
            case 'Monthly' : limitCount = 12; break;
            case 'Months' : limitCount = 12 / val; break;
            case 'Weekly' : limitCount = 52; break;
            case 'Weeks' : limitCount = 52 / val; break;
            case 'Daily' : limitCount = 365; break;
            case 'Days' : limitCount = 365 / val; break;
            default: break;
        }
        return limitCount;
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }


    fn_back() {
        const backNavigationExtras: NavigationExtras = {
            queryParams: this.deal_info
        };
        this.router.navigate(['opportunities-retail'], backNavigationExtras);
    }

    gotoPaymentOptions() {
        if (this.investment_amount) {
            this.deal_info = {...this.deal_info, targetAmount: this.investment_amount};
            const navigationExtras: NavigationExtras = {
                queryParams: this.deal_info
            };
            this.router.navigate(['opportunities-payment-options'], navigationExtras);
        } else {
            this.isError = true;
        }
    }

}
