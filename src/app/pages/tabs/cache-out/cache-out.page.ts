import {ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HeaderService} from 'src/app/services/UI/header.service';
import {AuthService} from '../../../services/auth/auth.service';
import {DealsService} from '../../../services/tabs/deals.service';
import {CashoutService} from '../../../services/tabs/cashout.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Platform} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-cache-out',
  templateUrl: './cache-out.page.html',
  styleUrls: ['./cache-out.page.scss']
})
export class CashOutPage implements OnInit, OnDestroy {

  @ViewChild('ionHeader', {static: false}) ionHeader: any;
  @ViewChild('headerTitle', {static: false}) headerTitle: any;
  @ViewChild('headerTxt', {static: false}) headerTxt: any;

  public ScrollAnimation = '';
  private hidden = false;
  private triggerDistance = 42;

  public myDeals = [] as any;
  public myBankAccounts = [] as any;
  public params = {} as any;
  public totalAmount: string;
  public submitParams = {} as any;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  private numberTotalAmount: number;
  selected_deal_id = 0;

  isValid = false;

  // cash out detail handling
  dealInfo;
  showCashOutSpinner = true;
  validate_form: FormGroup;
  isSubmitReady = false;
  submitState = false;
  duringSumbmit = false;
  isIosPlatform = false;
  validation_messages = {
    amount: [
      {type: 'required', message: 'Please input amount.'}
    ],
    bank_name: [
      {type: 'required', message: 'Please input bank name.'}
    ],
  };

  constructor(
    private renderer: Renderer2,
    private headerService: HeaderService,
    private authService: AuthService,
    private dealsService: DealsService,
    private cashoutService: CashoutService,
    private platform: Platform,
    public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    if (this.platform.is('ios')) {
      this.isIosPlatform = true;
    }
  }

  createValidateForm(dealId = 0) {
    this.validate_form = this.formBuilder.group({
      amount: new FormControl(Validators.compose([Validators.required])),
      deal_id: new FormControl(dealId, Validators.compose([Validators.required])),
      bank_name: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  listenFormChange() {
    if (this.validate_form.valid && this.validate_form.value.amount > 0 && this.validate_form.value.amount <= this.numberTotalAmount) {
      this.isSubmitReady = true;
    } else {
      this.isSubmitReady = false;
    }
  }

  ionViewWillEnter() {
    this.dealInfo = [];
    this.myDeals = [];
    this.params = {} as any;
    this.selected_deal_id = 0;
    this.unsubscribeAll = new Subject<any>();
    this.route.queryParams.pipe(
        takeUntil(this.unsubscribeAll)
    ).subscribe(params => {
      if (params.selected_deal_id) {
        this.selected_deal_id = params.selected_deal_id;
      }
      this.params = {...this.authService.userInfo};
      this.dealsService.getMyDeals(this.authService.userInfo).subscribe(response => {
        if (response.RESPONSECODE === 1) {
          this.myDeals = response.data.deals;
          if (response.data.deals.length > 0) {
            if (this.selected_deal_id === 0) {
              this.selected_deal_id = response.data.deals[0].deal_id;
            }
            this.validate_form.get('deal_id').setValue(Number(this.selected_deal_id));
            this.cdr.detectChanges();
          }
        }
      });
    });

    // ionChange event start ----------------------
    this.validate_form.get('deal_id').valueChanges.pipe(
        takeUntil(this.unsubscribeAll)
    ).subscribe(value => {
      // this.validate_form.get('deal_id').setValue(value);
      this.params = {...this.params, deal_id: value};
      this.checkValid(value);
      this.fnGetCashOut();
      this.fnGetCashOutDetail();
    });
    // ionChange event end ----------------------
  }

  ngOnDestroy() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnInit() {
    this.createValidateForm();
  }

  ionViewWillLeave() {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  checkValid(deal_id) {
    this.myDeals.forEach(myDeal => {
      if (myDeal.deal_id === deal_id) {
        // this.isValid = myDeal.withdraw;
        let dealInfo = { ... this.authService.userInfo, deal_id: deal_id};
        this.dealsService.withdrawState(dealInfo).subscribe((res) => {
          if (res.RESPONSECODE === 1) {
            this.isValid = res.data.withdraw;
          } else {
            this.isValid = false;
          }
          if (this.isValid) {
            this.validate_form.get('amount').enable();
            this.validate_form.get('bank_name').enable();
          } else {
            this.validate_form.get('amount').disable();
            this.validate_form.get('bank_name').disable();
          }
        });
      }
    });
  }

  fnGetCashOutDetail() {
    try {
      this.showCashOutSpinner = true;
      this.dealInfo = [];
      let dealsParams: any;
      dealsParams = {...this.params, type: 'all'}; // withdraw
      this.dealsService.getMMTelecomRetail(dealsParams).subscribe(response => {
        this.showCashOutSpinner = false;
        if (response.RESPONSECODE === 1) {
          this.fnFillterDetailByDate(this.setColorInData(response.data.transaction)).then((result) => {
            const temp = {};
            result.forEach(item => {
              if (!temp[item.id]) {
                temp[item.id] = {id: item.id, realData: []};
              }
              temp[item.id].realData.push(item.realData);
            });
            this.dealInfo = Object.values(temp);
          });
        }
      });
    } catch (e) {
      console.log('error occurred' + e);
      this.showCashOutSpinner = false;
    }
  }

  fnFillterDetailByDate(param): Promise<any> {
    return new Promise((resolve) => {
      const temp = [];
      param.forEach((each) => {
        const tempData = {
          id: each.date.split(' ')[0],
          realData: each
        };
        if (each.type === 'Withdraw') {
          temp.push((tempData));
        }
        resolve(temp);
      });
    });
  }

  setColorInData(data) {
    data.forEach((temp) => {
      temp.amount = this.numberWithCommas(temp.amount);
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

  fnGetCashOut() {
    this.totalAmount = null;
    this.myBankAccounts = [] as any;
    try {
      this.cashoutService.getCashoutInfo(this.params).subscribe(response => {
        if (response.RESPONSECODE === 1) {
          console.log(response.data);
          this.numberTotalAmount = response.data.total_amount;
          this.totalAmount = this.numberWithCommas(response.data.total_amount);
          this.myBankAccounts = response.data.bank_details;
          if (this.myBankAccounts.length > 0) {
            // this.validate_form.get('accout_number').setValue(response.data.bank_details[0].accout_number);
            this.cdr.detectChanges();
          }
        } else {
          this.validate_form.get('bank_name').setValue('');
        }
      });
    } catch (e) {
      console.log('error Cashout info...');
    }
  }

  async onFormSubmit() {
    if (this.validate_form.valid) {
      try {
        this.submitState = true;
        this.isSubmitReady = true;
        this.duringSumbmit = true;
        this.submitParams = {...this.params, amount: this.validate_form.value.amount, bank_account: this.validate_form.value.bank_name};
        const response = await this.cashoutService.fnWithdraw(this.submitParams).toPromise();
        if (response.RESPONSECODE === 1) {
          this.fnGetCashOutDetail();
        }
      } catch (e) {
        console.log('submit withdraw error : ', e);
        this.isSubmitReady = false;
      } finally {
        this.submitState = false;
        this.isSubmitReady = false;
        this.duringSumbmit = false;
      }

    } else {
      this.submitState = true;
      this.isSubmitReady = false;
      this.duringSumbmit = false;
    }
  }

  userTypingForm(event) {
    if (event.keyCode === 13) {
      this.onFormSubmit();
    }
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
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

}
