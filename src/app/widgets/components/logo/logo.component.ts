import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor() { }

  public stickHeigth1 = '60px';
  public stickHeigth2 = '60px';
  public stickHeigth3 = '60px';

  ngOnInit() {
    this.fnAnimation();
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
