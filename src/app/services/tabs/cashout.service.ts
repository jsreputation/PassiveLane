import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashoutService {

  constructor(
    public https: HttpClient,
  ) { }

  getCashoutInfo(data): Observable<any> {
      return this.https.get('https://www.passivelane.com/apiinvestor/withdraw', {params: data});
  }

  fnWithdraw(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiinvestor/withdrawprocess', {params: data});
  }
}
