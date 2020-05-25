import {Injectable} from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AntiGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    const result = this.auth.isAuthenticated();
      return !result;
    // return !result;
    // return this.auth.isAuthenticated();
  }
}
