import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import { HeaderService } from 'src/app/services/UI/header.service';
import { InvestService } from 'src/app/services/tabs/invest.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-investment-amount',
    templateUrl: './investment-amount.page.html',
    styleUrls: ['./investment-amount.page.scss'],
})
export class InvestmentAmountPage implements OnInit {

    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;
    public ScrollAnimation = '';
    deal_info = {} as any;
    public isError = false;
    public isValidError = false;
    private hidden = false;
    private triggerDistance = 42;
    private investment_amount: number;
    public amountVal = 0;
    public sumAmount = '';
    investimentDetails = {} as any;
    private queryParams = {} as any;
    public tempAmount: number;
    public noOfShares: number;
    public readyToNext = false;
    public showOffers = false;
    public plegeOffers = [];
    public steps: number;
    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        public route: ActivatedRoute,
        private investService: InvestService,
        private authService: AuthService
    ) {
    }

    ionViewWillEnter() {
        this.investService.getinvestmentdetails(this.queryParams).subscribe(res => {
            console.log(this.queryParams);
            if (res.RESPONSECODE === 1) {
                console.log(res.data);
                this.investimentDetails = res.data;
                if (this.queryParams.type === 'Equity') {
                    this.confirmAddressBoolean();
                } else {
                    this.steps = 3;
                }
            }
        });

    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params) {
                this.deal_info = [] as any;
                this.deal_info = params;
                console.log(this.deal_info);
                this.queryParams = params;
            }
        });
    }

    confirmAddressBoolean() {
        this.investService.hadAddressInfo(this.authService.userInfo).subscribe((res) => {
            console.log(res);
            if (res.RESPONSECODE === 1) {
                if (res.data.address) {
                    this.steps = 3;
                } else {
                    this.steps = 4;
                }
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
        this.amountVal = 0;
        this.sumAmount = '';
        this.validAmount(val, min, max);
    }

    validAmount(val, min, max) {
        console.log(val, min, max);
        if (this.cvm(min) <= this.cvm(val) && this.cvm(val) <= this.cvm(max)) {
            // console.log(this.cvm(min), this.cvm(val));
            // this.amountVal = this.cvm(val);
            // this.sumAmount = this.sumAmountInYear();
            this.isValidError = false;
            if (this.deal_info.type === 'Equity') {
                this.readyToNext = false;
                this.defineShowOffers(val);
            } else {
                this.readyToNext = true;
            }
        } else {
            this.isValidError = true;
            this.showOffers = false;
            this.readyToNext = false;
        }
    }

    defineShowOffers(typeVal) {
        this.plegeOffers = [];
        const temp = typeVal / this.investimentDetails.share_price;
        const offerOne = {
            amount: (this.investimentDetails.share_price * Math.floor(temp)).toFixed(2),
            count: Math.floor(temp)
        };
        if ((this.investimentDetails.share_price * Math.floor(temp)) < this.cvm(this.investimentDetails.min_amount)
        ) {
            // tslint:disable-next-line: no-string-literal
            offerOne['disabled'] = true;
        } else {
            // tslint:disable-next-line: no-string-literal
            offerOne['disabled'] = false;
        }
        const offerTwo = {
            amount: (this.investimentDetails.share_price * Math.ceil(temp)).toFixed(2),
            count: Math.ceil(temp)
        };
        if ((this.investimentDetails.share_price * Math.floor(temp)) > this.cvm(this.investimentDetails.max_amount)
        ) {
            // tslint:disable-next-line: no-string-literal
            offerTwo['disabled'] = true;
        } else {
            // tslint:disable-next-line: no-string-literal
            offerTwo['disabled'] = false;
        }
        this.plegeOffers[0] = offerOne;
        this.plegeOffers[1] = offerTwo;
        this.showOffers = true;
    }

    defineNoOfShares(e, amount) {
        this.tempAmount = amount;
        console.log(e.target.value);
        this.noOfShares = e.target.value;
        this.showOffers = false;
        this.readyToNext = true;
    }

    cvm(val) {
        return val.replace(',', '') * 1;
    }

    fn_back() {
        const backNavigationExtras: NavigationExtras = {
            queryParams: this.deal_info
        };
        if (this.deal_info.newurl) {
            this.router.navigate(['opportunities-retail'], backNavigationExtras);
        } else {
            this.router.navigate(['main/invest/invest-mm-telecom-retail'], backNavigationExtras);
        }
    }

    gotoPaymentOptions() {
        if (this.investment_amount) {
            // this.deal_info = {...this.deal_info, targetAmount: this.investment_amount, step: 2, totalSteps: this.steps };
            this.deal_info = {...this.deal_info, targetAmount: this.tempAmount, step: 2, totalSteps: this.steps };
            const navigationExtras: NavigationExtras = {
                queryParams: this.deal_info
            };
            if (this.deal_info.newurl) {
                if (this.steps === 4) {
                    this.router.navigate(['opportunities-address-confirm'], navigationExtras);
                } else {
                    this.router.navigate(['opportunities-payment-options'], navigationExtras);
                }
            } else {
                if (this.steps === 4) {
                    this.router.navigate(['main/invest/address-confirm'], navigationExtras);
                } else {
                    this.router.navigate(['main/invest/payment-options'], navigationExtras);
                }
            }
        } else {
            this.isError = true;
        }
    }

    // sumAmountInYear() {
    //     let sumResult = 0;
    //     if (this.investimentDetails.roi_percentage) {

    //         let limitPerYear = 1;
    //         let durationType = this.investimentDetails.contract_duration.split(' ')[1];
    //         let durationVal = this.investimentDetails.contract_duration.split(' ')[0];
    //         if (!durationType) {
    //             durationType = this.investimentDetails.contract_duration.split(' ')[0];
    //             durationVal = 1;
    //         }
    //         console.log('durationType : ', durationType);
    //         console.log('durationVal : ', durationVal);
    //         limitPerYear = this.getAmountLimitPerYear(durationType, durationVal);
    //         console.log('limitPerYear : ', limitPerYear);

    //         const rate = 1 + parseFloat(this.investimentDetails.roi_percentage) / 100;

    //         for (let i = 1; i < limitPerYear; i++) {
    //             sumResult += this.amountVal * (Math.pow(rate, i));
    //         }
    //     }
    //     if (this.investimentDetails.share_price) {
    //         const rate = 1 + parseFloat(this.investimentDetails.share_price) / 100;
    //         sumResult = this.amountVal * (Math.pow(rate, 1));
    //         //
    //         // for (let i = 1; i < 12; i++) {
    //         //     sumResult += this.amountVal * (Math.pow(rate, i));
    //         // }
    //     }
    //     return this.numberWithCommas(sumResult);
    // }

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

}
