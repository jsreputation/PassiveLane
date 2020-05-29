import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, Platform} from '@ionic/angular';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth/auth.service';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {VerifyModalService} from '../verifyModal.service';
import { ToastService } from 'src/app/services/UI/toast.service';
import { Storage } from '@ionic/storage';
@Component({
    selector: 'app-bank-details-form',
    templateUrl: './bank-details-form.component.html',
    styleUrls: ['./bank-details-form.component.scss'],
})
export class BankDetailsFormComponent implements OnInit {

    private addUrl = 'https://www.passivelane.com/apiinvestor/saveprofilebankinfo';
    private upadteUrl = 'https://www.passivelane.com/apiinvestor/updateprofilebankinfo';
    private deleteUrl = 'https://www.passivelane.com/apiinvestor/deleteprofilebankinfo';

    constructor(
        public fb: FormBuilder,
        private platform: Platform,
        private authService: AuthService,
        private profileService: ProfileService,
        private verifyMdlService: VerifyModalService,
        private toastCtrl: ToastService,
        private storage: Storage
    ) {
        if (this.platform.is('ios')) {
            this.isIosPlatform = true;
        }
    }

    validate_form: FormGroup;
    isSubmitReadies = [];
    submitStates = [];
    isAddedStates = [];
    isIosPlatform = false;
    validation_messages = {

        bank_id: [],

        bankAccountHolder: [
            {type: 'required', message: 'Account holder\'s name is required.'}
        ],
        bank_acc_country: [
            {type: 'required', message: 'Bank account country is required.'}
        ],
        bankAccountNumber: [
            {type: 'required', message: 'Bank account number is required.'},
            {type: 'minlength', message: 'Bank account must be at least 8 characters long.'},
        ],
        bankSortCode: [
            {type: 'required', message: 'Bank sort code is required.'},
            {type: 'minlength', message: 'Bank sort code must be at least 6 characters long.'},
        ],

        bankIFSCCode: [],

        bankABANumber: [],

        bankRoutingCode: [],

        bankAccountIban: [],

        bankAccountBic: [],

        bankname: [
            {type: 'required', message: 'Bank name is required.'}
        ],
        bankbranch: [
            {type: 'required', message: 'Bank branch is required.'}
        ],
        bankaddress: [
            {type: 'required', message: 'Bank address is required.'}
        ],
        bankcity: [
            {type: 'required', message: 'Bank city is required.'}
        ],
    };

    accountCountries = [] as any;
    bankDetails = [] as any;

    isAutoSelect = false;
    searchError = [] as any;

    ngOnInit() {
        this.initBankInfo();
    }

    initBankInfo() {

        this.validate_form = this.fb.group({
            bankDetails: this.fb.array([])
        });

        this.profileService.getBankDetail().subscribe(res => {
            if (res.RESPONSECODE === 1) {
                this.bankDetails = res.data.banks;
                if (this.bankDetails.length > 0) {
                    this.setBankDetails();
                    this.bankDetails[0].Expanded = true;
                }
            } else {
                console.log('error : ', res);
            }
        });
    }

    addNewBank() {
        const control = this.validate_form.controls.bankDetails as FormArray;
        const initialVal = this.initFormGroup({} as any);
        this.bankDetails.map(bankInfo => {
            if (bankInfo.Expanded) {
                bankInfo.Expanded = false;
            }
        });
        this.bankDetails.push({...initialVal.value, Expanded: true});

        control.push(initialVal);

        this.isSubmitReadies.push(false);
        this.submitStates.push(false);
        this.isAddedStates.push(true);
    }

    async deleteBank(index: any, bankID: any) {
        const control = this.validate_form.controls.bankDetails as FormArray;
        if (bankID > 0) {
            let submitParams = {} as any;
            submitParams = {...this.authService.userInfo, bank_id: bankID};
            console.log(submitParams, '###############');
            // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
            //     if (res.RESPONSECODE === 1) {
                    await this.verifyMdlService.showMdl(this.deleteUrl, submitParams).then(() => {
                        if (this.profileService.savedProfileDetail.bank_id) {
                            control.removeAt(index);
                            this.isSubmitReadies.splice(index, 1);
                            this.submitStates.splice(index, 1);
                            this.isAddedStates.splice(index, 1);
                            this.bankDetails.splice(index, 1);
                        }
                    });
                // } else {
                //     console.log('error : ', res);
                // }
            // });
        } else {
            control.removeAt(index);
            this.isSubmitReadies.splice(index, 1);
            this.submitStates.splice(index, 1);
            this.isAddedStates.splice(index, 1);
            this.bankDetails.splice(index, 1);
        }
    }

    get bankDetailsArray() {
        return this.validate_form.controls.bankDetails as FormArray;
    }

    setBankDetails() {
        const control = this.validate_form.controls.bankDetails as FormArray;
        this.bankDetails.forEach(x => {
            control.push(
                this.initFormGroup(x)
            );
            this.isSubmitReadies.push(false);
            this.submitStates.push(false);
            this.isAddedStates.push(false);
        });
    }

    onFormSubmit(index: any) {
        const control = this.validate_form.controls.bankDetails as FormArray;
        if (control.controls[index].valid) {
            this.submitStates[index] = true;
            this.isSubmitReadies[index] = true;
            let submitParams = {} as any;
            submitParams = {...this.authService.userInfo, user_type: this.authService.user_name_info.user_type, ...this.validate_form.value.bankDetails[index]};
            console.log(' ####### submitting ######## ', submitParams);

            // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
            //     if (res.RESPONSECODE === 1) {
            //         await this.verifyMdlService.showMdl(this.addUrl, submitParams);
            //         this.submitStates[index] = false;
            //         this.isSubmitReadies[index] = false;
            //     } else {
            //         console.log('error : ', res);
            //         this.isSubmitReadies[index] = false;
            //     }
            // });
            // this.profileService.sendSMS(this.authService.userInfo).subscribe((res) => {
            //     if (res.RESPONSECODE === 1) {
                    this.profileService.saveProfile(this.addUrl, submitParams).subscribe(
                        (result: any) => {
                            this.submitStates[index] = false;
                            this.isSubmitReadies[index] = false;
                            if (result.RESPONSECODE === 1) {
                                this.toastCtrl.presentSpecificText('Saved successfully.');
                            } else if (result.RESPONSECODE === 0) {
                                this.toastCtrl.presentSpecificText('Failed saving.');
                            }
                        },
                        error => {
                            this.submitStates[index] = false;
                            this.isSubmitReadies[index] = false;
                            this.toastCtrl.presentSpecificText('Sever Api problem.');
                        }
                    );
            //     }
            // });
        } else {
            this.submitStates[index] = true;
            this.isSubmitReadies[index] = false;
        }
    }

    updateStorage() {
        const type = this.authService.verification_type;
        this.storage.get('current_user').then(res => {
    
          if(type === 'sms') {
            res.data.user_info.verification.is_sms = true;
    
          } else if (type === 'bank') {
            res.data.user_info.verification.is_bank = true;
          } else if (type === 'id') {
            res.data.user_info.verification.is_id = true;
          }
    
          if (res.data.user_info.verification.is_id && res.data.user_info.verification.is_sms && res.data.user_info.verification.is_bank) {
            res.data.user_info.verification.is_verify = true;
            this.authService.is_verify = true;
          }
          this.storage.set('current_user', res).then(result => {
            console.log('set_result : ', result);
            // setTimeout(() => {
            //   this.authService.ifLoggedIn();
            // }, 500);
          })
        })
      }

    async onFormUpdate(index: any) {
        const control = this.validate_form.controls.bankDetails as FormArray;
        if (control.controls[index].valid) {
            this.submitStates[index] = true;
            this.isSubmitReadies[index] = true;
            let submitParams = {} as any;
            submitParams = {...this.authService.userInfo, user_type: this.authService.user_name_info.user_type, ...this.validate_form.value.bankDetails[index]};
            console.log(' ####### updating ######## ', submitParams);

            // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
            //     if (res.RESPONSECODE === 1) {
                    // await this.verifyMdlService.showMdl(this.upadteUrl, submitParams);
                    this.profileService.saveProfile(this.upadteUrl, submitParams).subscribe(
                        (result: any) => {
                          console.log('result => ', result);
                          if (result.RESPONSECODE === 1) {
                            this.profileService.savedProfileDetail = submitParams;
                            console.log('success: ', result.RESPONSE);
                            this.submitStates[index] = false;
                            this.isSubmitReadies[index] = false;
                            this.updateStorage();
                          } else if (result.RESPONSECODE === 0) {
                            console.log('error: ', result.RESPONSE);
                          }
                        },
                        error => {
                          console.log('error => ', error);
                        }
                    );
            //     } else {
            //         console.log('error : ', res);
            //         this.isSubmitReadies[index] = false;
            //     }
            // });
        } else {
            this.submitStates[index] = true;
            this.isSubmitReadies[index] = false;
        }
    }

    initFormGroup(data: any): any {
        this.accountCountries = this.profileService.countries;
        return this.fb.group({
            bank_id: new FormControl(data.bank_id || '', Validators.compose([])),

            bankAccountHolder: new FormControl(data.account_holder || '', Validators.compose([
                Validators.required
            ])),
            bank_acc_country: new FormControl(data.bank_acc_country || this.accountCountries[0].country || '', Validators.compose([
                Validators.required
            ])),
            bankAccountNumber: new FormControl(data.account_number || '', Validators.compose([
                Validators.required,
                Validators.minLength(8),
            ])),
            bankSortCode: new FormControl(data.sort_code || '', Validators.compose([
                Validators.required,
                Validators.minLength(6),
            ])),

            bankIFSCCode: new FormControl('', Validators.compose([])),

            bankABANumber: new FormControl('', Validators.compose([])),

            bankRoutingCode: new FormControl('', Validators.compose([])),

            bankAccountBic: new FormControl(data.bic || '', Validators.compose([])),

            bankAccountIban: new FormControl(data.iban || '', Validators.compose([])),

            bankname: new FormControl(data.bank_name || '', Validators.compose([
                Validators.required
            ])),
            bankbranch: new FormControl(data.bank_branch || '', Validators.compose([
                Validators.required
            ])),
            bankaddress: new FormControl(data.bank_address || '', Validators.compose([
                Validators.required
            ])),
            bankcity: new FormControl(data.bank_city || '', Validators.compose([
                Validators.required
            ])),
        });
    }

    searchBankInfo(index: any) {

        const data = {
            key: encodeURIComponent('PN88-RM89-XR98-ZG26'),
            AccountNumber: this.validate_form.value.bankDetails[index].bankAccountNumber,
            SortCode: this.validate_form.value.bankDetails[index].bankSortCode,
        };
        this.searchError = [] as any;
        this.profileService.getBankInfo(data).subscribe(
            (result: any) => {
                if (result.Items.length === 1 && typeof (result.Items[0].Error) !== 'undefined') {
                    console.log(result.Items[0].Description);
                    this.searchError[index] = result.Items[0].Description;
                    return;
                } else {
                    if (!result.Items[0].IsCorrect) {
                        this.searchError[index] = result.Items[0].StatusInformation;
                        return;
                    }
                    if (result.Items.length > 0) {
                        // patching data ....................
                        const patchData = {
                            sort_code: data.SortCode,
                            account_number: data.AccountNumber,
                            iban: result.Items[0].IBAN,
                            bic: result.Items[0].BankBIC,
                            bank_name: result.Items[0].Bank,
                            bank_branch: result.Items[0].Branch,
                            bank_address: result.Items[0].ContactAddressLine1,
                            bank_city: result.Items[0].ContactPostTown,
                        };
                        this.updateFormFromResponse(patchData, index);

                    } else {
                        console.log('Sorry, there were no results');
                    }
                }
            },
            error => {
                console.log('error => ', error);
            }
        );
    }

    ExpandItem(index: any) {
        if (this.bankDetails[index].Expanded) {
            this.bankDetails[index].Expanded = false;
        } else {
            this.bankDetails.map(listItem => {
                if (this.bankDetails[index] === listItem) {
                    listItem.Expanded = !listItem.Expanded;
                } else {
                    listItem.Expanded = false;
                }
                return listItem;
            });
        }
    }

    onCheck(event: any) {
        this.isAutoSelect = event.detail.value;
    }

    updateFormFromResponse(data: any, index: number) {
        const control = this.validate_form.controls.bankDetails as FormArray;
        const form = control.controls[index];
        form.get('bankSortCode').setValue(data.sort_code);
        form.get('bankAccountNumber').setValue(data.account_number);
        form.get('bankAccountIban').setValue(data.iban);
        form.get('bankAccountBic').setValue(data.bic);
        form.get('bankname').setValue(data.bank_name);
        form.get('bankbranch').setValue(data.bank_branch);
        form.get('bankaddress').setValue(data.bank_address);
        form.get('bankcity').setValue(data.bank_city);
        return;
    }
}
