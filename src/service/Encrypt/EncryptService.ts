import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private readonly tempSecret: string = "TODO env.secret_encrypt";
  private readonly key = CryptoJS.enc.Utf8.parse(this.tempSecret);
  private readonly iv = CryptoJS.enc.Utf8.parse(
    this.tempSecret.split('').reverse().join('')
  );

  constructor() {}

  encryptUsingAES256(EncryptString: object) {
    var Encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(JSON.stringify(EncryptString)),
      this.key,
      {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return Encrypted;
  }

  decryptUsingAES256(DecryptString: any) {
    var result = {};
    var Decrypted = CryptoJS.AES.decrypt(DecryptString, this.key, {
      KeySize: 128 / 8,
      iv: this.iv,
      Mode: CryptoJS.mode.CBC,
      Padding: CryptoJS.pad.Pkcs7,
    });
    try {
      result = JSON.parse(Decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      result = { error: true };
    }
    return result;
  }
}
