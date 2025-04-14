import {
  iAuthService,
  iUserStorage,
  isAuthenticatedRequestBody,
  UserRegisterDto,
} from './iAuthService';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpService } from '../Http/HttpService';
import { iHttpRequest } from '../Http/iHttpService';
import { StorageService } from '../LocalStorage/LocalStorageService';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements iAuthService {
  static cookieKeys = ['userId', 'userRole', 'userToken'];
  public _routerAngular: Router;
  constructor(
    private _httpService: HttpService,
    private _storageService: StorageService
  ) {
    this._routerAngular = new Router();
  }
  public PostUser = async (args: UserRegisterDto) => {
    return await this._httpService.request<boolean>({
      path: 'user/PostUser',
      type: 'POST',
      body: args,
    });
  };
  public Authenticate = async (
    requestBody: isAuthenticatedRequestBody
  ): Promise<boolean> => {
    const headers: iHttpRequest = {
      path: 'user/AuthenticateUser',
      type: 'POST',
      body: requestBody,
    };
    return await this._httpService
      .request<iUserStorage>(headers)
      .then((res) => {
        this.StoreCredentials(res!);
        this._routerAngular.navigate(['home']);
        return true;
      })
      .catch((err) => {
        return false;
      });
  };
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
}