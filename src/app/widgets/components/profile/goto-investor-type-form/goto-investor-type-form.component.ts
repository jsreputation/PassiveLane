import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-goto-investor-type-form',
  templateUrl: './goto-investor-type-form.component.html',
  styleUrls: ['./goto-investor-type-form.component.scss'],
})
export class GotoInvestorTypeFormComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  gotoInvestorType() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        isUpdated: true
      }
    };
    this.router.navigate(['investor-type'], navigationExtras);
  }

}
