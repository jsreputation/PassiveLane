import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cache-out-details',
  templateUrl: './cache-out-details.component.html',
  styleUrls: ['./cache-out-details.component.scss'],
})
export class CacheOutDetailsComponent implements OnInit {

  // @Input() showSpinner = false;
  @Input() dealInfo: any[];

  constructor() {
  }

  ngOnInit() {
  }

  numberWithCommas(x) {
    const parts = (Math.round(x * 100) / 100).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

}
