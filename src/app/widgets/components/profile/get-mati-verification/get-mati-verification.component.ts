import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../../services/tabs/profile.service';

@Component({
    selector: 'app-get-mati-verification',
    templateUrl: './get-mati-verification.component.html',
    styleUrls: ['./get-mati-verification.component.scss'],
})
export class GetMatiVerificationComponent implements OnInit {

    matiVerification = {} as any;

    constructor(
        private profileService: ProfileService
    ) {
    }

    async ngOnInit() {
        this.profileService.getMatiVerification().subscribe(res => {
            this.matiVerification = res.data.photo;
            console.log(res);
        });
        const basicInfo = await this.profileService.getBasicInfo().toPromise();
        if (basicInfo.RESPONSECODE === 1) {
            this.matiVerification = basicInfo.data.basic_info;
        }
    }

}
