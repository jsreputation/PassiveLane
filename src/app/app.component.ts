import {Component} from '@angular/core';

import {MenuController, Platform, PopoverController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {FCM} from '@ionic-native/fcm/ngx';
import {PopoverComponent} from './widgets/components/popover/popover.component';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    user_name_info = {} as any;
    isload = false;
    notification: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController,
        private router: Router,
        private authService: AuthService,
        public fcm: FCM,
        public popoverController: PopoverController,
        public storage: Storage
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            // subscribe to a topic
            this.fcm.subscribeToTopic('marketing');

            // get FCM token
            this.fcm.getToken().then(token => {
                console.log('fcm token : ', token);
                this.storage.set('device_id', token);
            });

            this.fcm.onNotification().subscribe(data => {
                console.log(data);
                if (data.wasTapped) {
                    console.log('Received in background');
                } else {
                    console.log('Received in foreground');
                    this.presentPopover(data).then(r => {
                      console.log('Received push notification!!!!!!!!!!!!!!');
                    });
                    setTimeout(() => {
                        this.notification.dismiss();
                    }, 2000);
                }
            });

            // refresh the FCM token
            this.fcm.onTokenRefresh().subscribe(token => {
                console.log('refresh token : ', token);
                this.storage.set('device_id', token);
            });

            this.fcm.unsubscribeFromTopic('marketing');

        });
    }


    async presentPopover(data: any) {
        this.notification = await this.popoverController.create({
            component: PopoverComponent,
            translucent: true,
            componentProps: {
                data
            }
        });
        return await this.notification.present();
    }

    onMenuOpen(event) {
        this.user_name_info = {} as any;
        this.user_name_info = this.authService.user_name_info;
        this.isload = true;
    }

    onMenuClose() {
        this.isload = false;
    }

    gotoProfilePage() {
        this.router.navigate(['tabs/profile']);
        this.menu.close('first');
    }

    gotoMyDealPage() {
        this.router.navigate(['tabs/my-deal/']);
        this.menu.close('first');
    }

    gotoInvestPage() {
        this.router.navigate(['tabs/invest/']);
        this.menu.close('first');
    }

    gotoActivityPage() {
        this.router.navigate(['tabs/activity/']);
        this.menu.close('first');
    }

    gotoPayPage() {
        this.router.navigate(['tabs/pay/']);
        this.menu.close('first');
    }

    gotoCashOutPage() {
        this.router.navigate(['tabs/cache-out/']);
        this.menu.close('first');
    }

    logout() {
        this.authService.logout();
        this.menu.close('first');
    }

}
