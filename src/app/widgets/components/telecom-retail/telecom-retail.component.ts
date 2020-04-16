import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-telecom-retail',
  templateUrl: './telecom-retail.component.html',
  styleUrls: ['./telecom-retail.component.scss'],
})
export class TelecomRetailComponent implements OnInit, OnChanges {

  public temp = {} as any;
  @Input('params') params: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.temp = {};
    if (changes.params.currentValue) {
      this.temp = JSON.parse(changes.params.currentValue);
      console.log(this.temp);
    }
  }

  ngOnInit() {
  }

}
