import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  public loading: any;
  constructor(
  ) {
  }

  headerClear(hRender, headerEl, hTitle, hTxt) {
    hRender.removeClass(headerEl, 'ScrollAnimation-off');
    hRender.removeClass(headerEl, 'ScrollAnimation');
    hRender.removeClass(hTitle, 'show-in');
    hRender.removeClass(hTitle, 'show-out');
    hRender.removeClass(hTxt, 'show-in');
    hRender.removeClass(hTxt, 'show-out');
  }

  headerShow(hRender, headerEl, hTitle, hTxt) {
    hRender.removeClass(headerEl, 'ScrollAnimation');
    hRender.addClass(headerEl, 'ScrollAnimation-off');

    hRender.removeClass(hTitle, 'show-out');
    hRender.addClass(hTitle, 'show-in');

    hRender.removeClass(hTxt, 'show-in');
    hRender.addClass(hTxt, 'show-out');
  }

  headerHide(hRender, headerEl, hTitle, hTxt) {
    hRender.removeClass(headerEl, 'ScrollAnimation-off');
    hRender.addClass(headerEl, 'ScrollAnimation');

    hRender.removeClass(hTitle, 'show-in');
    hRender.addClass(hTitle, 'show-out');

    hRender.removeClass(hTxt, 'show-out');
    hRender.addClass(hTxt, 'show-in');
  }
}
