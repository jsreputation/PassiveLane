import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ModalController, Platform} from '@ionic/angular';
import {AuthService} from '../../../../services/auth/auth.service';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {VerifyModalService} from '../verifyModal.service';
import { ToastService } from 'src/app/services/UI/toast.service';

@Component({
    selector: 'app-basic-info-form',
    templateUrl: './basic-info-form.component.html',
    styleUrls: ['./basic-info-form.component.scss'],
})
export class BasicInfoFormComponent implements OnInit {

    validate_form: FormGroup;
    isSubmitReady = false;
    submitState = false;
    isIosPlatform = false;
    validation_messages = {
        first_name: [
            {type: 'required', message: 'First name is required.'}
        ],
        // middle_name: [
        //     {type: 'required', message: 'Middle name is required.'}
        // ],
        last_name: [
            {type: 'required', message: 'Last name is required.'}
        ],
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Please enter a valid email.'}
        ],
        day_of_birth: [
            {type: 'required', message: 'Birth day is required.'}
        ],
    };
    private sendUrl = 'https://www.passivelane.com/apiinvestor/saveprofilebasicinfo';

    constructor(
        private router: Router,
        private modalCtrl: ModalController,
        public formBuilder: FormBuilder,
        private platform: Platform,
        private authService: AuthService,
        private profileService: ProfileService,
        private toastCtrl: ToastService
    ) {
        if (this.platform.is('ios')) {
            this.isIosPlatform = true;
        }
    }

    ngOnInit() {
        this.initializeData();
        this.validate_form = this.formBuilder.group({
            first_name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            middle_name: new FormControl('', Validators.compose([
                // Validators.required
            ])),
            last_name: new FormControl('', Validators.compose([
                Validators.required
            ])),
            email: new FormControl({ value: '', disabled: true }, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            day_of_birth: new FormControl('', Validators.compose([
                Validators.required
            ])),
        });
    }

    async initializeData() {
        const basicInfo = await this.profileService.getBasicInfo().toPromise();
        if (basicInfo.RESPONSECODE === 1) {
            this.validate_form.patchValue(basicInfo.data.basic_info);
        }
    }

    async onFormSubmit() {
        if (this.validate_form.valid) {
            this.submitState = true;
            this.isSubmitReady = true;

            let param = {} as any;
            param = {...this.authService.userInfo, ...this.validate_form.value};
            this.profileService.saveProfile(this.sendUrl, param).subscribe(
                (result: any) => {
                    this.submitState = false;
                    this.isSubmitReady = false;
                },
                error => {
                    this.submitState = false;
                    this.isSubmitReady = false;
                    this.toastCtrl.presentSpecificText('Sever Api problem.');
                });
            // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
            //     alert(JSON.stringify(res));
            //     if (res.RESPONSECODE === 1) {
            //         await this.verifyMdlService.showMdl(this.sendUrl, param);
            //         this.submitState = false;
            //         this.isSubmitReady = false;
            //     } else {
            //         console.log('error : ', res);
            //         this.isSubmitReady = false;
            //     }
            // });

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
