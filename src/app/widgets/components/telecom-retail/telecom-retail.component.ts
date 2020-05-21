import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { InvestService } from 'src/app/services/tabs/invest.service';


@Component({
  selector: 'app-telecom-retail',
  templateUrl: './telecom-retail.component.html',
  styleUrls: ['./telecom-retail.component.scss'],
})
export class TelecomRetailComponent implements OnInit {
  dealType: number;
  investimentDetails: any;
  public temp = {} as any;
  // tslint:disable-next-line: no-input-rename
  @Input() params: any;
  @Input() dataParams: any;
  constructor(
    private investService: InvestService
  ) {
  }

  ngOnInit() {
    this.temp = JSON.parse(this.params);
    if (this.temp.type === 'Equity') {
      this.dealType = 1;
    } else {
      this.dealType = 0;
    }
    this.investService.getinvestmentdetails(this.dataParams).subscribe(res => {
      if (res.RESPONSECODE === 1) {
          this.investimentDetails = res.data;
      }
    });
  }
}
