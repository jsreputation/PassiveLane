import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService) {
  }

  canActivate(): boolean {
    const result = this.auth.isAuthenticated();
    return result;
    // return this.auth.isAuthenticated();
  }

}
