import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  constructor(
    private https: HttpClient
  ) {
  }

  getAllPledges(user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/pledges', {params: user_info});
  }

  sendPaymentInfo(pledges): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/confirmpaymentprocess', {params: pledges});
  }

  cancelPledge(user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/pledges', {params: user_info});
  }

  getPledgeInfo(pledgeInfo): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/pledge', {params: pledgeInfo});
  }

}
