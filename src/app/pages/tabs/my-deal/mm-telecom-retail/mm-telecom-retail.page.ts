import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from 'src/app/services/UI/header.service';
import {DealsService} from 'src/app/services/tabs/deals.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {myEnterAnimation} from '../../../../widgets/animations/enter.animation';
import {myLeaveAnimation} from '../../../../widgets/animations/leave.animation';
import {MydealDetailComponent} from '../../../../widgets/modals/mydeal-detail/mydeal-detail.component';
import { CertificatePage } from '../certificate/certificate.page';

@Component({
    selector: 'app-mm-telecom-retail',
    templateUrl: './mm-telecom-retail.page.html',
    styleUrls: ['./mm-telecom-retail.page.scss'],
})
export class MmTelecomRetailPage implements OnInit {


    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;

    public ScrollAnimation = '';

    private hidden = false;
    private triggerDistance = 42;

    private sum_amount: any;
    isReady = false;
    public title = '';

    private tempAllData = [] as any;
    public checked = 0;

    dealDetail = {} as any;
    private dealInfo = {} as any;
    logo_image = '';

    deals = [] as any;
    filterdDealsByYear = [] as any;
    realSumAmounts = [];
    isReadyAmounts = false;

    public currentYear: number;
    public myDealsYears = [];

    isWithdraw = false;
    isCertificate: boolean;
    certificateData: any;
    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        public route: ActivatedRoute,
        private dealsService: DealsService,
        private authService: AuthService,
        private modalCtrl: ModalController,
    ) {
    }

    ionViewWillEnter() {
        this.route.queryParams.subscribe((params) => {
            if (params) {
                this.dealInfo = { ... this.authService.userInfo, deal_id: params.deal_id };
            }
        });
        this.isReady = false;
        // withdraw state
        this.dealsService.withdrawState(this.dealInfo).subscribe(
            (res) => {
                if (res.RESPONSECODE === 1) {
                    this.isWithdraw = res.data.withdraw;
                    // this.isWithdraw = true;
                } else {
                    console.log('response error');
                    this.isWithdraw = false;
                }
            },
            (error) => {
                console.log(error);
                this.isWithdraw = false;
            }
        );
        // certificate detail
        const paramsData = { ... this.authService.userInfo, deal_id: this.dealInfo.deal_id };
        this.dealsService.checkCertificateAvailable(paramsData).subscribe((result) => {
            if (result.RESPONSECODE === 1 && result.data.certificate) {
                console.log('certificate params:  ', result);
                this.isCertificate = true;
                this.certificateData = result.data;
            } else {
                this.isCertificate = false;
            }
        }, err => {
            this.isCertificate = false;
        });
        // deal detail
        this.dealsService.getMMTelecomRetail(this.dealInfo).subscribe(
            (result) => {
                if (result.RESPONSECODE === 1) {
                    console.log('deal : ', result);
                    this.tempAllData = result.data.transaction;
                    this.logo_image = result.data.transaction[0].logo_image;
                    this.getYearArray();
                    if (!this.currentYear) {
                        this.currentYear = this.myDealsYears[0];
                    }
                    this.initFilteredData();
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    onChange(ev) {
        this.currentYear = ev.detail.value;
        this.initFilteredData();
    }

    initFilteredData() {
        this._changeSumAmount().then(result => {
            this.deals = [] as any;
            this.deals = result;
            this.filterdDealsByYear = this.filterBySelectedYear(this.deals);
            this.isReady = true;
        });
    }

    async presentModal() {
        this.dealDetail = {...this.dealDetail, sum_amount: this.sum_amount};
        const modal = await this.modalCtrl.create({
            component: MydealDetailComponent,
            cssClass: 'mydealDetail-modal',
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: this.dealDetail
        });
        await modal.present();
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.title = '';
            this.dealDetail = {};
            if (params) {
                this.dealDetail = params;
                this.title = params.deal_name;
                this.dealInfo = {deal_id: params.deal_id, ...this.authService.userInfo};
            }
        });
    }

    filterBySelectedYear(data) {
        const tempArrayFilteredByDate = [] as any;
        data.map(param => {
            let paramDate;
            paramDate = new Date(param.id.replace(/-/g, '/'));
            if (this.currentYear === paramDate.getFullYear()) {
                tempArrayFilteredByDate.push(param);
            }
        });
        return tempArrayFilteredByDate;
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
        this.router.navigate(['main/my-deal']);
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    getYearArray() {
        this.tempAllData.forEach((data) => {
            let flag = false;
            const paramYear = new Date(data.date.replace(/-/g, '/')).getFullYear();
            if (paramYear) {
                if (this.myDealsYears.length > 0) {
                    flag = this.myDealsYears.every((item: any) => {
                        return paramYear !== item;
                    });
                    if (flag) {
                        this.myDealsYears.push(paramYear);
                        flag = false;
                    }
                } else {
                    this.myDealsYears.push(paramYear);
                }
            }
        });
    }

    _changeSumAmount() {
        return new Promise((resolve) => {
            let tempDeals = [] as any;
            this.isReadyAmounts = false;
            if (this.tempAllData) {
                this.fnFillterDetailByDate(this.setColorInData(this.tempAllData)).then((result) => {
                    const temp = {};
                    result.forEach(item => {
                        if (!temp[item.id]) {
                            temp[item.id] = {id: item.id, realData: []};
                        }
                        temp[item.id].realData.push(item.realData);
                    });
                    tempDeals = Object.values(temp);
                    this.addSumAmount(tempDeals);
                    this.addCapitalAmount(tempDeals);
                    resolve(tempDeals);
                });
                this.isReadyAmounts = true;
            }
        });
    }

    addSumAmount(data) {
        data.map(deal => {
            deal.sum_amount = this.sumAmount(deal.realData);
            deal.roi_amount = this.sumRoiAmount(deal.realData);
        });
    }

    setColorInData(data) {
        data.forEach((temp) => {
            temp.amount = temp.amount;
            switch (temp.type) {
                case 'ROI' :
                    temp.color = 'color-success';
                    break;
                case 'Capital' :
                    temp.color = 'color-success';
                    break;
                case 'Withdraw' :
                    temp.color = '';
                    break;
                default:
                    break;
            }
        });
        return data;
    }

    fnFillterDetailByDate(param): Promise<any> {
        return new Promise((resolve) => {
            const temp = [];
            param.forEach((each) => {
                const tempData = {
                    id: each.date.split(' ')[0],
                    realData: each
                };
                temp.push((tempData));
                resolve(temp);
            });
        });
    }

    sumAmount(param) {
        let sumAmount = 0;
        param.map(each => {
            const temp = each.amount;
            // if (each.type === 'Capital') {
            //     sumAmount += parseFloat(temp);
            // } else if (each.type === 'ROI') {
            //     sumAmount += parseFloat(temp);
            // } else if (each.type === 'Withdraw') {
            //     sumAmount -= parseFloat(temp);
            // }
            if (each.type !== 'Withdraw') {
                sumAmount += parseFloat(temp);
            } else {
                sumAmount -= parseFloat(temp);
            }
        });
        return sumAmount;
    }

    sumRoiAmount(param) {
        let tempRoiAmount = 0;
        param.forEach(each => {
            const temp = each.amount;
            if (each.type === 'ROI') {
                tempRoiAmount += parseFloat(temp);
            }
        });
        return tempRoiAmount;
    }

    addCapitalAmount(deals): any {
        deals.map((currentValue, index, array) => {
            currentValue.capital_amount = this.sum(deals, deals.length) - this.sum(deals, index);
        });
    }

    sum(deals, dataLength: any) {
        let temp = 0;
        if (dataLength === 0) {
            temp = 0;
        } else {
            for (let i = 0; i < dataLength; i++) {
                temp += deals[i].sum_amount;
            }
        }
        return temp;
    }

    onWithdraw() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                selected_deal_id: this.dealDetail.deal_id
            }
        };
        this.router.navigate(['/main/cache-out'], navigationExtras);
    }

    async onCertificate() {
        const modal = await this.modalCtrl.create({
            component: CertificatePage,
            cssClass: 'activityDetail-modal',
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: this.certificateData
        });
        await modal.present();
    }
}
