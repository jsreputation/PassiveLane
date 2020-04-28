import {ChangeDetectorRef, Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {HeaderService} from 'src/app/services/UI/header.service';
import {AuthService} from '../../../services/auth/auth.service';
import {DealsService} from '../../../services/tabs/deals.service';
import {myEnterAnimation} from '../../../widgets/animations/enter.animation';
import {myLeaveAnimation} from '../../../widgets/animations/leave.animation';
import {IonSlides, ModalController} from '@ionic/angular';
import {ActivityDetailComponent} from '../../../widgets/modals/activity-detail/activity-detail.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.page.html',
    styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit, OnChanges {

    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;
    // @ts-ignore
    @ViewChild('slides') slider: IonSlides;

    hide = false;

    public ScrollAnimation = '';
    public curSegmentIndex: number;
    private hidden = false;
    private triggerDistance = 42;
    private Params = [] as any;
    public dealInfo = [] as any;

    public filteredName = '';


    deals = [] as any;
    myDeals = [] as any;
    isReadyAmounts = false;

    slideOpts = {
        slidesPerView: 1.2,
        centeredSlides: true,
        loop: false
    };

    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private authService: AuthService,
        private dealsService: DealsService,
        private modalCtrl: ModalController
    ) {
    }

    ionViewWillEnter() {
        this.Params = [] as any;
        this.dealInfo = [];

        this.dealsService.getMyDeals(this.authService.userInfo).subscribe(
            (result: any) => {
                if (result.RESPONSECODE === 1) {
                    this.myDeals = result.data.deals;
                    console.log(result.data);
                } else {
                    console.log('error : ', result.data);
                }
            },
            error => {
                console.log(error);
            }
        );


        let param = {} as any;
        param = {...this.authService.userInfo};
        this.dealsService.getActivityInfo(param).subscribe((result) => {
            console.log('activity_data => ', result);
            if (result.RESPONSECODE === 1) {
                this.dealInfo = result.data.transaction;
                this.Params = result.data.transaction;
            }
            this._changeSumAmount();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    ngOnInit() {
    }

    ionViewWillLeave() {
        this.curSegmentIndex = 0;
        if (!this.hidden) {
            this.headerService.headerClear(this.renderer, this.ionHeader.el, this.headerTitle.nativeElement, this.headerTxt.el);
        }
    }

    handleClick() {
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

    async presentModal(deal_id, amount) {
        console.log('clicked : ', deal_id, amount);
        const modal = await this.modalCtrl.create({
            component: ActivityDetailComponent,
            cssClass: 'activityDetail-modal',
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: {
                deal_id,
                amount
            }
        });
        await modal.present();
    }


    _changeSumAmount() {
        this.deals = [] as any;
        this.isReadyAmounts = false;
        if (this.Params) {
            console.log('result', this.Params);
            this.fnFillterDetailByDate(this.setColorInData(this.Params)).then((result) => {
                const temp = {};
                result.forEach(item => {
                    if (!temp[item.id]) {
                        temp[item.id] = {id: item.id, realData: []};
                    }
                    temp[item.id].realData.push(item.realData);
                });
                this.deals = Object.values(temp);
                this.addSumAmount();
            });
            this.isReadyAmounts = true;
        }
    }

    addSumAmount() {
        this.deals.forEach(deal => {
            deal.sum_amount = this.sumAmount(deal.realData);
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
        param.forEach(each => {
            const temp = each.amount;
            // if (each.type === 'Capital') {
            //     sumAmount += parseFloat(temp);
            // } else if (each.type === 'ROI') {
            //     sumAmount += parseFloat(temp);
            // } else if (each.type === 'Withdraw') {
            // sumAmount -= parseFloat(temp);
            if (each.type !== 'Withdraw') {
                sumAmount += parseFloat(temp);
            } else {
                sumAmount -= parseFloat(temp);
            }
        });
        return sumAmount;
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }
}
