import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  public tickInterval = 0.1;

  @Input('max') mMax: number;
  @Input('min') mMin: number;
  @Input('value') mValue: number;

  constructor() {
    this.mMin = 0;
    this.mMax = 4;
    this.mValue = 0;
  }

  ngOnInit() {
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  slideDidChange(e) {
    console.log(e);
  }
}
