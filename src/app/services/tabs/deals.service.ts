import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(
    public https: HttpClient,
  ) {
  }

  getMyDeals(user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apideals/mydeals', {params: user_info});
  }

  getMMTelecomRetail(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/investtracker', {params: data});
  }

  getActivityInfo(data): Observable<any> {
    console.log(data);
    return this.https.get('https://www.passivelane.com/apiinvestor/activity', {params: data});
  }

  getContractInfo(data): Observable<any> {
    console.log('get : ', data);
    return this.https.get('https://www.passivelane.com/apiinvestor/viewcontract', {params: data});
  }

  withdrawState(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/withdrawbutton', {params: data});
  }

  checkCertificateAvailable(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/certificatebutton', {
      params: data
    });
  }

  getCertificateDetails(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/certificate', {
      params: data
    });
  }
}
