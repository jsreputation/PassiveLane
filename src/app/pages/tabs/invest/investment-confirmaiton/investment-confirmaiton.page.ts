import {Component, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {HeaderService} from 'src/app/services/UI/header.service';
import {InvestService} from 'src/app/services/tabs/invest.service';
import {AuthService} from 'src/app/services/auth/auth.service';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-investment-confirmaiton',
    templateUrl: './investment-confirmaiton.page.html',
    styleUrls: ['./investment-confirmaiton.page.scss'],
})
export class InvestmentConfirmaitonPage implements OnInit {


    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;
    @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;

    ScrollAnimation = '';
    agreementTxt: any;
    checkBoxForm = [
        {val: 'I have read and accept the contract agreement above.', isChecked: false},
        {
            val: 'I understand and confirm that i am responsible for my own investment decision and due diligence and i am owed no duty of care by any other investors or sharholders Of this business.',
            isChecked: false
        },
        {val: 'I acknowledge and understand that this deal with be held a Nominee Structure.', isChecked: false},
    ];
    private hidden = false;
    private triggerDistance = 42;
    public submitparams = {} as any;
    isCheckedSubmitReady = false;
    public totalSteps: number;
    isReady = false;
    signInfo = '';

    // private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    //   // 'minWidth': 2,
    //   maxWidth: 3,
    //   // 'canvasWidth': 500,
    //   // 'canvasHeight': 300
    // };
    signaturePadOptions = {maxWidth: 3} as any;

    DealType = '';
    validate_form: FormGroup;
    isSubmitReady = false;
    submitState = false;
    isIosPlatform = false;
    validation_messages = {
        flatno: [
            {type: 'required', message: 'Flat number is required.'}
        ],
        buildno: [
            {type: 'required', message: 'Build number is required.'}
        ],
        buildname: [
            {type: 'required', message: 'Build name is required.'}
        ],
        street: [
            {type: 'required', message: 'Street name is required.'}
        ],
        substreet: [
            {type: 'required', message: 'Sub street name is required.'}
        ],
        town: [
            {type: 'required', message: 'Town name is required.'}
        ],
        postcode: [
            {type: 'required', message: 'Postcode is required.'}
        ],
        country: [
            {type: 'required', message: 'Country name is required.'}
        ],
    };

    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        public route: ActivatedRoute,
        private investService: InvestService,
        private authService: AuthService,
        private profileService: ProfileService,
        public formBuilder: FormBuilder,

    ) {
    }


    // tslint:disable-next-line:use-lifecycle-interface
    ionViewWillEnter(changes: SimpleChanges) {
        this.agreementTxt = '';
        this.isReady = false;
        this.isSignatured();
        this.route.queryParams.subscribe((params) => {
            if (params) {
                console.log(params);
                this.submitparams = {...params};
                this.totalSteps = parseInt(params.totalSteps, 10);
                this.DealType = params.type;
                const apiParams = { ... this.authService.userInfo, deal_id: this.submitparams.deal_id, targetAmount: this.submitparams.targetAmount };
                this.investService.getAgreeText(apiParams).subscribe(
                    (result) => {
                        if (result.RESPONSECODE === 1) {
                            this.agreementTxt = result.data.text;
                            this.isReady = true;
                        } else {
                            console.log('RESPONSECODE : 0');
                        }
                    },
                    (error) => {
                        console.log('error => ', error);
                    }
                );
            }
        });
    }

    isSignatured() {
        this.profileService.getSignature(this.authService.userInfo).subscribe(res => {
            console.log(res);
            if (res.RESPONSECODE === 1) {
                this.signInfo = res.data.sign;
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

    onSelect(event, i) {
        if (event.detail.checked) {
            this.checkBoxForm[i].isChecked = true;
        } else {
            this.checkBoxForm[i].isChecked = false;
        }
        this.is_submit();
    }

    is_submit() {
        this.isCheckedSubmitReady = this.checkBoxForm.every((item: any) => {
            return item.isChecked === true;
        });
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit() {
        // this.signaturePad is now available
        this.signaturePad.set('maxWidth', 3); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }

    clear() {
        this.signaturePad.clear();
    }

    ngOnInit() {
        // this.validate_form = this.formBuilder.group({
        //     flatno: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     buildno: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     buildname: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     street: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     substreet: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     town: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     postcode: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        //     country: new FormControl('', Validators.compose([
        //         Validators.required
        //     ])),
        // });
    }

    fn_back() {
        this.submitparams = { ... this.submitparams };
        this.submitparams.step = parseInt(this.submitparams.step, 10) - 1;
        const backNavigationExtras: NavigationExtras = {
            queryParams: this.submitparams
        };
        if (this.submitparams.newurl) {
            this.router.navigate(['opportunities-payment-options'], backNavigationExtras);
        } else {
            this.router.navigate(['main/invest/payment-options'], backNavigationExtras);
        }
    }

    gotoYourInvestment() {
        if (!this.signInfo) {
            this.submitparams = {...this.submitparams, sign: this.signaturePad.toDataURL(), default_sign: 1};
        }
        this.investService.submitInvestInfo(this.submitparams).subscribe((response) => {
            if (response.RESPONSECODE === 1) {
                console.log(response);
                this.submitparams = {...this.submitparams, pledge_id: response.data.pledge_id };
                const navigationExtras: NavigationExtras = {
                    queryParams: this.submitparams
                };
                if (this.submitparams.newurl) {
                    this.router.navigate(['opportunities-your-investment'], navigationExtras);
                } else {
                    this.router.navigate(['main/invest/your-investment'], navigationExtras);
                }
            }
        });
    }

    async onFormSubmit() {
        if (this.validate_form.valid) {
            this.submitState = true;
            this.isSubmitReady = true;
            let param = {} as any;
            param = {...this.submitparams, ...this.validate_form.value};
            console.log(this.validate_form.value);
            this.investService.submitInvestInfo(param).subscribe((response) => {
                if (response.RESPONSECODE === 1) {
                    console.log('ok ::::: ', response);
                    const navigationExtras: NavigationExtras = {
                        queryParams: this.submitparams
                    };
                    this.submitState = false;
                    this.isSubmitReady = false;
                    this.router.navigate(['main/invest/your-investment'], navigationExtras);
                } else {
                    console.log('error : ', response);
                    this.isSubmitReady = false;
                }
            });
        } else {
            this.submitState = true;
            this.isSubmitReady = false;
        }
    }

    userTypingForm(event) {
        if (event.keyCode === 13) {
            this.onFormSubmit();
        }
    }
}
