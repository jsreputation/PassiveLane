import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../services/tabs/profile.service';
@Component({
  selector: 'app-proof-of-id',
  templateUrl: './proof-of-id.component.html',
  styleUrls: ['./proof-of-id.component.scss'],
})
export class ProofOfIdComponent implements OnInit {
  matiVerification = {} as any;
  verifiedStatus: string;
  constructor(
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    this.profileService.getMatiVerification().subscribe(res => {
        this.matiVerification = res.data.photo;
        console.log(res);
        this.verifiedStatus = this.matiVerification.status;
    });
    const basicInfo = await this.profileService.getBasicInfo().toPromise();
    if (basicInfo.RESPONSECODE === 1) {
        this.matiVerification = basicInfo.data.basic_info;
    }
  }
}
