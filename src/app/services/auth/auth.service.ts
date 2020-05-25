import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Platform, ToastController} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {tap} from 'rxjs/operators';
import {ToastService} from '../UI/toast.service';

const TOKEN_KEY = 'current_user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authState = new BehaviorSubject(false);
    token: any;
    userInfo: any;
    user_name_info: any;

    mail_verify = false;
    is_onboarding = false;
    is_verify = false;
    deals_added = false;

    verification_type = '';

    constructor(
        private router: Router,
        public https: HttpClient,
        public storage: Storage,
        private platform: Platform,
        private toastUIService: ToastService
    ) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }

    ifLoggedIn() {
        this.storage.get(TOKEN_KEY).then((res) => {
            if (res) {
                console.log(res);
                if (res.RESPONSECODE === 1 && res.token) {
                    this.authState.next(true);
                    this.user_name_info = res.data.user_info;
                    this.mail_verify = res.data.user_info.mail_verify;
                    this.is_verify = res.data.user_info.is_verify;
                    this.is_onboarding = res.data.user_info.is_onboarding;
                    this.deals_added = res.data.user_info.deals_added;
                    this.userInfo = {
                        user_id: this.user_name_info.user_id,
                        token: res.token,
                    };
                    // verify
                    if (this.mail_verify) {
                        // if (this.is_verify) {
                            this.gotoPage();
                        // } else {
                        //     this.router.navigate(['/verify']);
                            // this.router.navigate(['main/my-deal'], { replaceUrl: true });
                        // }
                    } else {
                        this.router.navigate(['/mail-verify']);
                        // this.router.navigate(['/tabs/my-deal']);
                    }
                }
            }
        });
    }

    storageCheck(res) {
        if (res) {
            console.log(res);
            if (res.RESPONSECODE === 1 && res.token) {
                this.user_name_info = res.data.user_info;

                this.mail_verify = res.data.user_info.mail_verify;

                this.is_verify = res.data.user_info.is_verify;
                this.is_onboarding = res.data.user_info.is_onboarding;
                this.deals_added = res.data.user_info.deals_added;

                this.userInfo = {
                    user_id: this.user_name_info.user_id,
                    token: res.token,
                };
            }
        }
    }

    gotoPage()  {
        console.log('is_onboarding : ', this.is_onboarding, '  deals_added : ', this.deals_added);
        // on boarding
        if (this.is_onboarding) {
            // is deal
            if (this.deals_added) {
                // if (this.is_verify) {
                    this.router.navigate(['main/my-deal']);
                // } else {
                //     this.router.navigate(['/verify']);
                // }
            } else {
                this.router.navigate(['/opportunities']);
            }
        } else {
            this.router.navigate(['investor-type']);
        }
    }

    logout() {
        this.storage.remove(TOKEN_KEY).finally(() => {
            this.authState.next(false);
            this.router.navigate(['sign-in']);
        });
    }

    isAuthenticated() {
        // if (!this.authState.value) {
        //     this.router.navigate(['sign-in']);
        // } else {
            return this.authState.value;
        // }
    }

    login(login_info): Observable<any> {
        this.authState.next(true);
        return this.https.post('https://www.passivelane.com/apiusers/login', login_info).pipe(
            tap((res) => {
                console.log('signup-----> ', res);
                if (res.RESPONSECODE === 0) {
                    this.toastUIService.presentToast(res, 'all');
                }
            })
        );
    }

    signup(data): Observable<any> {
        return this.https.post('https://www.passivelane.com/apiusers/register', data).pipe(
            tap((res) => {
                console.log('signup-----> ', res);
                if (res.RESPONSECODE === 0) {
                    this.toastUIService.presentToast(res, 'all');
                }
            })
        );
    }

    passwordRecover(data): Observable<any> {
        return this.https.post('https://www.passivelane.com/apiusers/passwordrecover', {email: data.email});
    }

}
