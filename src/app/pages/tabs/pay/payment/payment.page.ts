import {Component, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActionSheetController, IonInfiniteScroll, ModalController} from '@ionic/angular';
import {HeaderService} from '../../../../services/UI/header.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {AuthService} from '../../../../services/auth/auth.service';
import {PayService} from '../../../../services/tabs/pay.service';
import {ConfirmPaymentComponent} from '../../../../widgets/modals/payment-sent/payment-sent.modal';
import {myEnterAnimation} from '../../../../widgets/animations/enter.animation';
import {myLeaveAnimation} from '../../../../widgets/animations/leave.animation';
import {CancelPledgeComponent} from '../../../../widgets/modals/cancel-pledge/cancel-pledge.modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {BankInfoComponent} from '../../../../widgets/modals/bank-info/bank-info.component';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.page.html',
    styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;
    @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

    public ScrollAnimation = '';
    public img: any = '';
    public no = 0;
    private hidden = false;
    private triggerDistance = 42;

    validateAmount: FormGroup;
    @Input() pledge_id: any;

    deal = {} as any;
    paymentLists = [] as any;
    isCancelpayment = true;
    isAuthSubmitReady = false;
    submitState = false;
    private pledgeInfo = {} as any;

    validation_messages = {
        amount: [
            {type: 'required', message: 'Amount is required.'},
        ]
    };
    bankAccount = {} as any;
    isBankDetail = false;
    isAmountTrue = false;

    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        private modalCtrl: ModalController,
        public actionSheetController: ActionSheetController,
        private camera: Camera,
        private authService: AuthService,
        private payService: PayService,
        public route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private profileService: ProfileService
    ) {
    }

    ionViewWillEnter() {
        this.isBankDetail = false;
        this.isCancelpayment = true;
        this.initializePledges();
    }

    fn_back() {
        this.router.navigate(['main/pay']);
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

    ngOnInit() {
        this.createValidation();
    }

    initializePledges() {
        this.validateAmount.patchValue({amount: ''});
        let paymentDetail = {} as any;
        this.route.queryParams.subscribe((params) => {
            if (params) {
                this.pledgeInfo = params;
                this.payService.getPledgeInfo(params).subscribe(
                    result => {
                        if (result.RESPONSECODE === 1) {
                            this.deal = {} as any;
                            this.paymentLists = [] as any;
                            paymentDetail = result.pledge;
                            this.deal = {...paymentDetail};
                            console.log('Deal Info:', this.deal);
                            if ( paymentDetail.payments) {
                                this.paymentLists = paymentDetail.payments.reverse();
                                this.paymentLists.map(param => {
                                    if (param.status !== 'Customer Paid') {
                                            this.isCancelpayment = false;
                                    }
                                });
                            }
                        } else {
                            console.log('RESPONSECODE : 0');
                        }
                    },
                    error => {
                        console.log(error);
                    });
            }
        });
    }

    createValidation() {
        this.validateAmount = this.formBuilder.group({
            amount: new FormControl('', Validators.compose([
                Validators.required,
            ]))
        });
    }

    numberWithCommas(x) {
        const parts = (Math.round(x * 100) / 100).toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    // sumPledgeAmount(dealInfo) {
    //     let sumAmount = 0;
    //     if (dealInfo.payments) {
    //         // tslint:disable-next-line:only-arrow-functions
    //         dealInfo.payments.forEach((payment) => {
    //             sumAmount += payment.amount * 1;
    //         });
    //     }
    //     return this.numberWithCommas(sumAmount);
    // }

    async confirmPaymenDialog() {
        const actionSheet = await this.actionSheetController.create({
            header: '£10,000',
            subHeader: 'Upload a screenshot of your payment confirmation',
            cssClass: 'pay-actionsheet',
            mode: 'md',
            buttons: [{
                text: 'Take photo',
                role: 'destructive',
                icon: 'photo',
                cssClass: 'actionsheet-photo-button',

                handler: () => {
                    console.log('photo clicked');
                    this.getPicture(this.camera.PictureSourceType.CAMERA);
                }
            }, {
                text: 'Gallery',
                icon: 'gallery',
                cssClass: 'actionsheet-gallery-button',

                handler: () => {
                    console.log('gallery clicked');
                    this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            }]
        });
        await actionSheet.present();
    }


    getPicture(srcType: PictureSourceType) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: srcType,
        };

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // const temp = imageData.split('?');
            // this.imageData = temp[0];
            this.no++;
            if (!this.deal.images) {
                this.deal.images = [];
            }
            this.deal.images.push({
                no: this.no,
                image_data: 'data:image/jpeg;base64,' + imageData,
            });

        }, (err) => {
            console.log(err);
        });
    }

    async cancelPaymentDialog(id) {
        console.log(id);
        const modal = await this.modalCtrl.create({
            component: CancelPledgeComponent,
            cssClass: 'payment-cancel-modal',
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: {
                pledge_id: id,
            }
        });
        await modal.present();
    }

    removePicture(index: number) {
        for (let i = 0; i < this.deal.images.length; i++) {
            if (this.deal.images[i].no === index) {
                this.deal.images.splice(i, 1);
            }
        }
    }

    listenAmountChange() {
        console.log(parseInt(this.validateAmount.value.amount, 10));
        if (parseInt(this.validateAmount.value.amount, 10) > 0) {
            this.isAuthSubmitReady = true;
        } else {
            this.isAuthSubmitReady = false;
        }
    }

    async submitPayment(pledge) {
        this.submitState = true;
        let submitParams = {};
        if (this.validateAmount.valid) {
            this.isAmountTrue = true;
            submitParams = {
                pledge_id: pledge.pledge_id,
                amount: this.validateAmount.value.amount,
                deal_name: pledge.deal_name,
                incoming_id: pledge.incoming_id,
                deal_id: pledge.deal_id,
                user_id: pledge.user_id,
                token: this.authService.userInfo.token
            };
            this.payService.sendPaymentInfo(submitParams).subscribe(
                result => {
                    console.log(result);
                    this.submitState = false;
                    if (result.RESPONSECODE === 1) {
                        // adding list in payment lists on local
                        const addPaymant = {
                            date: (new Date()).toISOString(),
                            amount: (this.validateAmount.value.amount).toString(),
                            status: 'Customer Paid'
                        };
                        this.paymentLists.unshift(addPaymant);
                        this.clearImages();
                        this.isAuthSubmitReady = false;
                        this.isAmountTrue = false;
                    } else {
                        this.isAuthSubmitReady = false;
                        this.isAmountTrue = false;
                    }
                },
                error => {
                    console.log('error => ', error);
                    this.isAuthSubmitReady = false;
                    this.isAmountTrue = false;
                }
            );
            const modal = await this.modalCtrl.create({
                component: ConfirmPaymentComponent,
                cssClass: 'payment-confirm-modal',
                enterAnimation: myEnterAnimation,
                leaveAnimation: myLeaveAnimation,
                componentProps: {
                    pledge: this.pledgeInfo,
                }
            });
            await modal.present();
        } else {
            this.isAuthSubmitReady = false;
        }
    }

    clearImages() {
        if (this.deal.images) {
            this.deal.images = [];
        }
    }

    // showBankDetails() {
    //     this.isBankDetail = true;
    //     this.bankAccount = {} as any;
    //     let submitParam = {} as any;
    //     submitParam = {...this.authService.userInfo, pledge_id: this.deal.pledge_id};

    //     this.profileService.getBankDetailInfo(submitParam).subscribe(async res => {
    //         if (res.RESPONSECODE === 1) {
    //             this.bankAccount = res.data.bank;
    //             console.log('bank_detail : ', this.bankAccount);
    //         } else {
    //             console.log('error : ', res);
    //         }
    //     });
    // }

    async showBankDetailModal() {
        const submitParam = {...this.authService.userInfo, pledge_id: this.deal.pledge_id};
        const modal = await this.modalCtrl.create({
            component: BankInfoComponent,
            cssClass: 'bankInfo-modal',
            enterAnimation: myEnterAnimation,
            leaveAnimation: myLeaveAnimation,
            componentProps: {
                params: submitParam,
                deal: this.deal
            }
        });
        await modal.present();
    }
}
