import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Platform, Events } from '@ionic/angular';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {AuthService} from '../../../../services/auth/auth.service';
import { ToastService } from 'src/app/services/UI/toast.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
    selector: 'app-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
    @Input() confirmRequest: boolean;
    validate_form: FormGroup;
    readytoSave = false;
    isSubmitReady = false;
    submitState = false;
    isIosPlatform = false;
    validation_messages = {
        buildno: [
            {type: 'required', message: 'Build number is required.'}
        ],
        buildname: [
            // {type: 'required', message: 'Build name is required.'}
        ],
        street: [
            {type: 'required', message: 'Street is required.'}
        ],
        substreet: [
            {type: 'required', message: 'Sub street is required.'}
        ],
        town: [
            {type: 'required', message: 'Town is required.'}
        ],
        postcode: [
            {type: 'required', message: 'Postcode is required.'}
        ],
        country: [
            {type: 'required', message: 'Country is required.'}
        ],
    };
    isAutoSelect = false;
    findAddressData = [] as any;
    countries = [] as any;
    addressClue: string;
    private sendUrl = 'https://www.passivelane.com/apiinvestor/saveprofileaddressinfo';

    constructor(
        public formBuilder: FormBuilder,
        private platform: Platform,
        private profileService: ProfileService,
        private authService: AuthService,
        private toastCtrl: ToastService,
        private events: Events
    ) {
        if (this.platform.is('ios')) {
            this.isIosPlatform = true;
        }
    }

    ngOnInit() {
        this.countries = this.profileService.countries;
        const firstCountryObject = this.countries[0];
        this.initializeData();
        this.validate_form = this.formBuilder.group({
            buildno: new FormControl('', Validators.compose([
                // Validators.required
            ])),
            buildname: new FormControl('', Validators.compose([
                // Validators.required
            ])),
            street: new FormControl('', Validators.compose([
                Validators.required
            ])),
            substreet: new FormControl('', Validators.compose([
                // Validators.required
            ])),
            town: new FormControl('', Validators.compose([
                Validators.required
            ])),
            postcode: new FormControl('', Validators.compose([
                Validators.required
            ])),
            country: new FormControl(firstCountryObject.country, Validators.compose([
                Validators.required
            ])),
        });
        this.listenFormValidation();
    }

    listenFormValidation() {
        this.validate_form.valueChanges.subscribe(() => {
            if (this.validate_form.valid) {
                this.readytoSave = true;
            } else {
                this.readytoSave = false;
            }
        });
    }

    initializeData() {
        this.profileService.getAddressDetail().subscribe(res => {
            if (res.RESPONSECODE === 1) {
                const addressDetail = res.data.address_info;
                console.log('address : ---------- : ', addressDetail);
                this.validate_form.patchValue({
                    flatno: addressDetail.flatno,
                    buildno: addressDetail.buildno,
                    buildname: addressDetail.buildname,
                    street: addressDetail.street,
                    substreet: addressDetail.substreet,
                    town: addressDetail.town,
                    postcode: addressDetail.postcode,
                });
            } else {
                console.log('error : ', res);
            }
            if (this.confirmRequest) {
                this.listenFormChanges();
            }
        });
    }

    listenFormChanges() {
        this.validate_form.valueChanges.subscribe((res) => {
            if (this.validate_form.valid) {
                this.events.publish('setNextValid', this.validate_form.value);
            } else {
                this.events.publish('setNextValid', false);
            }
        });
    }

    async onFormSubmit() {
        if (this.validate_form.valid) {
            console.log(this.validate_form.value);
            this.submitState = true;
            this.isSubmitReady = true;
            let param = {} as any;
            param = {...this.authService.userInfo, ...this.validate_form.value};
            this.profileService.saveProfile(this.sendUrl, param).subscribe(
                (result: any) => {
                    this.readytoSave = false;
                    this.submitState = false;
                    this.isSubmitReady = false;
                    if (result.RESPONSECODE === 1) {
                        // this.toastCtrl.presentSpecificText('Saved successfully.');
                    } else if (result.RESPONSECODE === 0) {
                        // this.toastCtrl.presentSpecificText('Failed saving.');
                    }
                },
                error => {
                    this.submitState = false;
                    this.isSubmitReady = false;
                    this.toastCtrl.presentSpecificText('Sever Api problem.');
                }
            );
        } else {
            this.submitState = true;
            this.isSubmitReady = false;
        }
    }

    searchAddressTyping(event) {
        this.addressClue = event.srcElement.value;
        if (event.srcElement.value && this.isAutoSelect) {
            this.findAddress(event.srcElement.value);
        }
    }

    userTypingForm(event) {
        if (event.keyCode === 13) {
            this.onFormSubmit();
        }
    }

    findAddress(value: string, type = null) {
        let data = {} as any;
        data = {
            Key: 'BG99-PK29-UD62-ED95',
            IsMiddleware: false,
            Text: value,
            Language: 'en-gb',
            Origin: '',
            Countries: 'GBR',
            Limit: 10,
            Container: '',
        };

        if (type) {
            data.Text = this.addressClue;
            data.Container = value;
        }

        this.profileService.getAddressInfo(data).subscribe(
            (result: any) => {
                if (result.Items.length === 1 && typeof (result.Items[0].Error) !== 'undefined') {
                    console.log(result.Items[0].Description);
                } else {
                    if (result.Items.length === 0) {
                        console.log('Sorry, there were no results');
                    } else {
                        this.findAddressData = result.Items;
                        console.log(this.findAddressData);
                    }
                }
            },
            error => {
                console.log('error => ', error);
            }
        );
    }

    onCheck(event: any) {
        if (this.isAutoSelect) {
            this.clearAddressInfo();
        }
        this.isAutoSelect = event.detail.value;
    }

    async retrieveAddress(Id: any) {
        let data = {} as any;
        data = {
            Key: 'BG99-PK29-UD62-ED95',
            // tslint:disable-next-line: object-literal-shorthand
            Id: Id,
        };
        const retrieveAddress = await this.profileService.getRetrieveAddressInfo(data).toPromise();
        if (retrieveAddress.Items.length === 1 && typeof(retrieveAddress.Items[0].Error) !== 'undefined') {
            console.log(retrieveAddress.Items[0].Description);
        } else {
            if (retrieveAddress.Items.length === 0) {
                console.log('Sorry, there were no results');
            } else {
                this.validate_form.patchValue({
                    buildno: retrieveAddress.Items[0].BuildingNumber,
                    buildname: retrieveAddress.Items[0].BuildingName,
                    street: retrieveAddress.Items[0].Street,
                    substreet: retrieveAddress.Items[0].SecondaryStreet,
                    town: retrieveAddress.Items[0].City,
                    postcode: retrieveAddress.Items[0].PostalCode,
                    country: retrieveAddress.Items[0].CountryIso3,
                });
                console.log('retrieveAddress : ', this.validate_form.value);
            }
        }
        this.clearAddressInfo();
    }

    selectAddress(Id: any, Type: any) {
        if (Type === 'Address') {
            this.retrieveAddress(Id);
        } else {
            this.findAddress(Id, 'container');
        }
    }

    clearAddressInfo() {
        this.findAddressData = [];
    }

}
