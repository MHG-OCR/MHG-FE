import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private _authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var currentUser = this._authService.GetCredentials();
    if (currentUser) {
      return true;
    }
    this._authService.navigateToLogin();
    return false;
  }
}