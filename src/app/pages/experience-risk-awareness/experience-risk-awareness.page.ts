import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {IonContent, MenuController} from '@ionic/angular';
import {HeaderService} from 'src/app/services/UI/header.service';
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: 'app-experience-risk-awareness',
    templateUrl: './experience-risk-awareness.page.html',
    styleUrls: ['./experience-risk-awareness.page.scss'],
})
export class ExperienceRiskAwarenessPage implements OnInit {


    @ViewChild('ionHeader', {static: false}) ionHeader: any;
    @ViewChild('headerTitle', {static: false}) headerTitle: any;
    @ViewChild('headerTxt', {static: false}) headerTxt: any;
    @ViewChild('btn_agree', {static: false}) btn_agree: any;
    @ViewChild(IonContent, {static: false}) ionContent: IonContent;
    // @ViewChild('headerQuizContent', { static: false }) headerQuizContent: any;

    public ScrollAnimation = '';
    public isSubmitReady = false;
    public illiquidproducts = [
        {
            title: 'Have you interested in illiquid products (for which there is no immediate market)',
            name: 'illiquidproducts',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
    ];
    public headerExperiences = [
        {
            title: 'Venture Capitalist Trusts',
            name: 'venturecapitaltrusts',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
        {
            title: 'AIM-Iisted shares',
            name: 'aimshares',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
        {
            title: 'Unlisted shares ',
            name: 'unlistedshares',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
        {
            title: 'Unlisted debt securities',
            name: 'unlisteddebt',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
        {
            title: 'Unregulated Funds (e.g. Funds)',
            name: 'unregulatedfunds',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
        {
            title: 'Structured funds (including futures or options)',
            name: 'structuredproducts',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        },
    ];
    public headerQuizs = [
        {
            title: 'Have you had any relevant experience over the last ten years that provides you with a good understanding of the risk of early-stage investments?',
            name: 'earlystageexperience',
            isInput: false,
            placeHolder: 'Please detail your experience',
            isError: false,
            errorMsg: 'Please input detail your experience',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ],
        },
        {
            title: 'Do you hold any educational or professional qualifications relevant to reviewing the investments you wish to make through us?',
            name: 'investmenteducation',
            isInput: false,
            placeHolder: 'Please detail your education/qualification in this area',
            isError: false,
            errorMsg: 'Please input detail your education/qualification in this area',
            value: [
                {val: true, is_checked: false, content: 'yes'},
                {val: false, is_checked: true, content: 'no'},
            ]
        }
    ];

    // ---------- START -----------
    public FAQs = [
        {
            title: 'What happens to most startups?',
            order: true,
            value: [
                {description: 'Correct! 97% of startups fail', val: 'success', is_checked: false, content: 'They fail'},
                {
                    description: 'InCorrect! They’re a success and return big profits to investors',
                    val: 'error',
                    is_checked: false,
                    content: ' They’re a success and return big profits to investors'
                },
            ]
        },
        {
            title: 'What happens if the start-up i invest in fails? ',
            order: true,
            value: [
                {
                    description: 'Correct! I am unlikely to get my investment back',
                    val: 'success',
                    is_checked: false,
                    content: 'I am unlikely to get my investment back'
                },
                {
                    description: 'InCorrect! Passive Lane will repay my investment',
                    val: 'error',
                    is_checked: false,
                    content: ' Passive Lane will repay my investment'
                },
            ]
        },
        {
            title: 'Will i be able to get my money back whenever i Wish? ',
            order: false,
            value: [
                {
                    description: 'InCorrect! the company don\'t must legally pay back my investment when i want',
                    val: 'error',
                    is_checked: false,
                    content: 'Yes, the company must legally pay me back my investment when i want '
                },
                {
                    description: 'Correct! you will not be able to sell your shares unless the company is bought or floats on a stock exchange',
                    val: 'success',
                    is_checked: false,
                    content: 'No typically i will not be able to sell my shares unless the company is bought or floats on a stock exchange'
                },
            ]
        },
        {
            title: 'Do start-ups pay dividents?',
            order: false,
            value: [
                {
                    description: 'InCorrect! you can not expect dividends periodically.',
                    val: 'error',
                    is_checked: false,
                    content: 'Yes, I can expect dividends periodically.'
                },
                {
                    description: 'Correct! Generally start-ups do not pay dividends.',
                    val: 'success',
                    is_checked: false,
                    content: 'No, generally start-ups do not pay dividends.'
                },
            ]
        },
        {
            title: 'What happends if the company I have invested in is successful and I want to sell my shares?',
            order: false,
            value: [
                {
                    description: 'InCorrect! They company founders must buy back my shares by law',
                    val: 'error',
                    is_checked: false,
                    content: 'They company founders must buy back my shares by law.'
                },
                {
                    description: 'Correct! You will not be able to sell your shares unless the company is bought or floats on a stock exchange.',
                    val: 'success',
                    is_checked: false,
                    content: 'Typically I will not be able to sell my shares unless the company is bought or floats on a stock exchange.'
                },
            ]
        },
        {
            title: 'What will happen to the level of your shareholding if a company issues more shares  in the future after you\'ve invested?',
            order: false,
            value: [
                {
                    description: 'InCorrect! Your proportionate shareholding of the company will increase',
                    val: 'error',
                    is_checked: false,
                    content: 'My proportionate shareholding of the company will increase.'
                },
                {
                    description: 'Correct! Your proportionate shareholding of the company will decrease.',
                    val: 'success',
                    is_checked: false,
                    content: 'My proportionate shareholding of the company will decrease.'
                },
            ]
        },
        {
            title: 'Which of these is the better method to use when investing in start-ups?',
            order: false,
            value: [
                {
                    description: 'InCorrect! Invest all of your money into a single company.',
                    val: 'error',
                    is_checked: false,
                    content: 'Invest all of your money into a single company.'
                },
                {
                    description: 'Correct! Spread your risk by investing in multiple companies.',
                    val: 'success',
                    is_checked: false,
                    content: 'Spread your risk by investing in multiple companies.'
                },
            ]
        }
    ];
    private hidden = false;
    private triggerDistance = 42;
    private investerParam = '';

    // --------- END -------------
    private sendParams = {} as any;
    private backUrl = '';
    private backParams = {} as any;
    private success: number;
    private error: number;

    is_verify = false;

    constructor(
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        private menuCtrl: MenuController,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {
        this.menuCtrl.enable(false);
    }

    ionViewWillEnter() {
        this.is_verify = false;
        this.is_verify = this.authService.user_name_info.is_verify;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params && params.investor_type) {
                this.investerParam = params.investor_type;
                switch (this.investerParam) {
                    case 'Everyday investor':
                        this.illiquidproducts = [];
                        this.headerExperiences = [];
                        this.headerQuizs = [];
                        this.backUrl = 'investor-type';
                        this.backParams = {} as any;
                        this.backParams.isUpdated = params.isUpdated;
                        break;
                    case 'Advised investor':
                        this.illiquidproducts = [];
                        this.headerExperiences = [];
                        this.headerQuizs = [];
                        this.backUrl = 'investor-type';
                        this.backParams = {} as any;
                        this.backParams.isUpdated = params.isUpdated;
                        break;
                    default:
                        this.backUrl = 'qualification-criteria';
                        this.backParams = params;
                        this.sendParams = {
                            investor_type: this.investerParam,
                            illiquidproducts: false,
                            venturecapitaltrusts: false,
                            aimshares: false,
                            unlistedshares: false,
                            unlisteddebt: false,
                            unregulatedfunds: false,
                            structuredproducts: false,
                            earlystageexperience: false,
                            investmenteducation: false,
                        };
                        break;
                }
                // tslint:disable-next-line
                for (const key in params) {
                    this.sendParams[key] = params[key];
                }
            }
        });
    }

    fn_focus(event, name) {
        if (event.srcElement.value === '') {
            switch (name) {
                case 'earlystageexperience':
                    this.headerQuizs[0].isError = true;
                    this.sendParams.earlystageexperience_dtls = '';
                    break;
                case 'investmenteducation':
                    this.headerQuizs[1].isError = true;
                    this.sendParams.investmenteducation_dtls = '';
                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'earlystageexperience':
                    this.headerQuizs[0].isError = false;
                    this.sendParams.earlystageexperience_dtls = event.srcElement.value;
                    break;
                case 'investmenteducation':
                    this.headerQuizs[1].isError = false;
                    this.sendParams.investmenteducation_dtls = event.srcElement.value;
                    break;
                default:
                    break;
            }
        }
    }

    userTyping(event, name) {
        if (event.srcElement.value !== '') {
            switch (name) {
                case 'earlystageexperience':
                    this.headerQuizs[0].isError = false;
                    break;
                case 'investmenteducation':
                    this.headerQuizs[1].isError = false;
                    break;
                default:
                    break;
            }
        }
    }

    radio_group(val, name) {
        if (val) {
            this.sendParams[name] = true;
            switch (name) {
                case 'earlystageexperience':
                    this.headerQuizs[0].isInput = true;
                    this.headerQuizs[0].isError = true;
                    break;
                case 'investmenteducation':
                    this.headerQuizs[1].isInput = true;
                    this.headerQuizs[1].isError = true;

                    break;
                default:
                    break;
            }
        } else {
            switch (name) {
                case 'earlystageexperience':
                    this.headerQuizs[0].isInput = false;
                    this.headerQuizs[0].isError = false;
                    delete this.sendParams.earlystageexperience_dtls;
                    break;
                case 'investmenteducation':
                    this.headerQuizs[1].isInput = false;
                    this.headerQuizs[1].isError = false;
                    delete this.sendParams.investmenteducation_dtls;
                    break;
                default:
                    break;
            }
            this.sendParams[name] = false;
        }
    }

    mcqAnswer(val, index, order) {
        if (order) {
            this.success = 1 , this.error = 0;
        } else {
            this.success = 0 , this.error = 1;
        }
        switch (val) {
            case 'success':
                this.FAQs[index].value[this.success].is_checked = false;
                this.FAQs[index].value[this.error].is_checked = true;
                break;
            case 'error':
                this.FAQs[index].value[this.error].is_checked = false;
                this.FAQs[index].value[this.success].is_checked = true;
                break;
            default:
                break;
        }
        this.radioValidation();
    }

    radioValidation() {

        this.isSubmitReady = this.FAQs.every(checkSuccess);

        function checkSuccess(data) {
            let index = 0;
            if (!data.order) {
                index = 1;
            }
            return data.value[index].is_checked === true;
        }

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
        const backNavigationExtras: NavigationExtras = {
            queryParams: this.backParams
        };
        this.router.navigate([this.backUrl], backNavigationExtras);
    }

    gotoAgreeToTerms() {
        if (!this.sendValidation()) {
            return;
        } else {
            console.log('sending : ', this.sendParams);
            for (let i = 1; i <= this.FAQs.length; i++) {
                this.sendParams['faq' + i] = true;
            }

            const navigationExtras: NavigationExtras = {
                queryParams: this.sendParams
            };
            this.router.navigate(['agree-to-terms'], navigationExtras);
        }
    }

    sendValidation() {
        if (this.sendParams.earlystageexperience && (this.sendParams.earlystageexperience_dtls === '' || !this.sendParams.earlystageexperience_dtls)) {
            console.log('error please input detail');
            this.ionContent.scrollByPoint(0, -1000, 300);
            return false;
        } else if (this.sendParams.investmenteducation && (this.sendParams.investmenteducation_dtls === '' || !this.sendParams.investmenteducation_dtls)) {
            console.log('error please input detail > ');
            this.ionContent.scrollByPoint(0, -1000, 300);
            return false;
        } else {
            return true;
        }
    }
}
