import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
