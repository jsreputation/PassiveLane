import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { InvestService } from 'src/app/services/tabs/invest.service';


@Component({
  selector: 'app-telecom-retail',
  templateUrl: './telecom-retail.component.html',
  styleUrls: ['./telecom-retail.component.scss'],
})
export class TelecomRetailComponent implements OnInit, OnChanges {
  dealType: number;
  investimentDetails: any;
  public temp = {} as any;
  // tslint:disable-next-line: no-input-rename
  @Input('params') params: any;
  @Input() dataParams: any;
  constructor(
    private investService: InvestService
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.temp = {};
    if (changes.params.currentValue) {
      this.temp = JSON.parse(changes.params.currentValue);
      console.log(this.temp);
      if (this.temp.type === 'Equity') {
        this.dealType = 1;
      } else {
        this.dealType = 0;
      }
    }
  }

  ngOnInit() {
    // this.investService.getinvestmentdetails(this.dataParams).subscribe(res => {
    //   if (res.RESPONSECODE === 1) {
    //       this.investimentDetails = res.data;
    //   }
    // });
  }
}
