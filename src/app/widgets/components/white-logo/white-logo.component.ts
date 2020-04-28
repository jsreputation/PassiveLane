import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-white-logo',
  templateUrl: './white-logo.component.html',
  styleUrls: ['./white-logo.component.scss'],
})
export class WhiteLogoComponent implements OnInit, OnChanges{

  @Input() isLoad: boolean;

  constructor() { }

  public stickHeigth1 = '60px';
  public stickHeigth2 = '60px';
  public stickHeigth3 = '60px';

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if(this.isLoad){
      this.fnAnimation();
    } else {
      this.stickHeigth1 = '60px';
      this.stickHeigth2 = '60px';
      this.stickHeigth3 = '60px';
    }
  }

  fnAnimation() {
    setTimeout(() => {
      this.stickHeigth1 = '0px';
    }, 400 * 1);

    setTimeout(() => {
      this.stickHeigth2 = '0px';
    }, 400 * 2);

    setTimeout(() => {
      this.stickHeigth3 = '0px';
    }, 400 * 3);
  }

}
