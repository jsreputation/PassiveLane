import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(
    public https: HttpClient,
  ) {
  }

  getInvestDeal(deal_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apideals/deal', {params: deal_info});
  }

  getDeals(url, user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apideals/' + url, {params: user_info});
  }

  getAllDeals(user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apideals/alldeals', {params: user_info});
  }

  getinvestmentdetails(params): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/getinvestmentdetails', {params});
  }

  getAgreeText(params): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/getagreementtext', {params});
  }

  submitInvestInfo(params): Observable<any> {
    return this.https.post('https://www.passivelane.com/apiinvestor/investprocess', params);
  }

  hadAddressInfo(user_info): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/hasaddressinfo', {params: user_info});
  }

  getInvestComplete(parmas): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/investmentcomplete', { params: parmas });
  }

  getBankDetails(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/pledgebankdetails', { params: data });
  }
}
