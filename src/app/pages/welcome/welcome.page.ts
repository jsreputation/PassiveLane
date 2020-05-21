import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(
    private router: Router,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  gotoSignIn() {
    this.router.navigate(['sign-in']);
  }

  takePicture() {
    this.router.navigate(['camera']);
  }

}
