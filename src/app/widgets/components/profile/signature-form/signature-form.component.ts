import {Component, OnInit, ViewChild} from '@angular/core';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';
import {ProfileService} from '../../../../services/tabs/profile.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {VerifyModalService} from '../verifyModal.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ToastService } from 'src/app/services/UI/toast.service';

@Component({
    selector: 'app-signature-form',
    templateUrl: './signature-form.component.html',
    styleUrls: ['./signature-form.component.scss'],
})
export class SignatureFormComponent implements OnInit {

    @ViewChild(SignaturePad, {static: false}) signaturePad: SignaturePad;
    signaturePadOptions = {maxWidth: 3} as any;

    validate_form: FormGroup;

    signInfo = '';
    isSubmitReady = false;
    submitState = false;
    private addUrl = 'https://www.passivelane.com/apiinvestor/addsignatured';
    private updateUrl = 'https://www.passivelane.com/apiinvestor/updatesignature';

    constructor(
        private profileService: ProfileService,
        private authService: AuthService,
        private verifyMdlService: VerifyModalService,
        public formBuilder: FormBuilder,
        private toastCtrl: ToastService
    ) {
    }

    ngOnInit() {
        this.profileService.getSignature(this.authService.userInfo).subscribe(res => {
            if (res.RESPONSECODE === 1) {
                this.signInfo = res.data.sign;
            }
        });
        this.validate_form = this.formBuilder.group({
            user_id: new FormControl(this.authService.userInfo.user_id, Validators.compose([])),
            token: new FormControl(this.authService.userInfo.token, Validators.compose([])),
            sign_image: new FormControl('', Validators.compose([])),
        });
    }

    drawComplete() {
    }

    drawStart() {
    }

    clear() {
        this.signaturePad.clear();
    }

    onFormSubmit() {
        this.submitState = true;
        this.isSubmitReady = true;
        this.validate_form.patchValue({ sign_image: this.signaturePad.toDataURL() });
        let sendUrl =  '';
        if (this.signInfo) {
            sendUrl = this.updateUrl;
        } else {
            sendUrl = this.addUrl;
        }
        // this.profileService.sendSMS(this.authService.userInfo).subscribe(async res => {
        //     if (res.RESPONSECODE === 1) {
        //         await this.verifyMdlService.showMdl(sendUrl, this.validate_form.value);
        //         this.submitState = false;
        //         this.isSubmitReady = false;
        //         if (this.profileService.savedProfileDetail.sign_image) {
        //             console.log(this.profileService.savedProfileDetail);
        //             this.signInfo = this.signaturePad.toDataURL();
        //         }
        //     } else {
        //         console.log('error : ', res);
        //         this.isSubmitReady = false;
        //     }
        // });
        this.profileService.saveProfile(sendUrl, this.validate_form.value).subscribe(
            (result: any) => {
                this.submitState = false;
                this.isSubmitReady = false;
                if (result.RESPONSECODE === 1) {
                    if (this.profileService.savedProfileDetail.sign_image) {
                        console.log(this.profileService.savedProfileDetail);
                        this.signInfo = this.signaturePad.toDataURL();
                    }
                    this.toastCtrl.presentSpecificText('Saved successfully.');
                } else if (result.RESPONSECODE === 0) {
                    this.toastCtrl.presentSpecificText('Failed saving.');
                }
            },
            error => {
                alert(JSON.stringify(error));
                this.submitState = false;
                this.isSubmitReady = false;
                this.toastCtrl.presentSpecificText('Sever Api problem.');
            }
        );
    }
}
