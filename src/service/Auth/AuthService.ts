import {
  iAuthService,
  iUserStorage,
} from './iAuthService';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '@helpers/LocalStorageHelper';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements iAuthService {
  static cookieKeys = ['userId', 'userRole', 'userToken'];
  constructor(
    private _storageService: StorageService,
    private _routerAngular: Router,
    private _Route: ActivatedRoute,
  ) {
  }
  public StoreCredentials = (userStorage: iUserStorage) => {
    const keys = Object.keys(userStorage!);
    const key_values = Object.values(userStorage!);
    for (var i = 0; i < keys.length; i++) {
      this._storageService.setItem(`${keys[i]}`, `${key_values[i]}`);
    }
  };
  public GetCredentials = () => {
    var returnCredentials: iUserStorage = {};
    for (var i = 0; i < AuthService.cookieKeys.length; i++) {
      var foundCookieVal = this._storageService.getItem(
        AuthService.cookieKeys[i]
      );
      if (foundCookieVal == null) return null;
      /*@ts-ignore*/
      returnCredentials[AuthService.cookieKeys[i]] = foundCookieVal;
    }
    return returnCredentials;
  };
  public clearCredentials = () => {
    for (var i = 0; i < AuthService.cookieKeys.length; i++) {
      this._storageService.removeItem(AuthService.cookieKeys[i]);
    }
  };
  public navigateToLogin = () => {
    this._routerAngular.navigate(['signin']);
  };

  public testGetTokenFromQueryP = () => {
    var token = this._Route.snapshot.queryParamMap.get("code")
    console.log(`token : ${token}`)
    return token
  }
}