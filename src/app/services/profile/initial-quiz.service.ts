import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialQuizService {

  constructor(
    public https: HttpClient,
  ) {
  }

  sendProfileInfo(data): Observable<any> {
    return this.https.get('https://www.passivelane.com/apiusers/initialprocess', {params: data});
  }
}
