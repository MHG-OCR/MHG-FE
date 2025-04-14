import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService implements Storage {
  protected readonly prefix: string = '';
  public get length(): number {
    return localStorage.length;
  }
  public constructor() {}

  private prefixKey(plainKey: string): string {
    if (this.prefix) {
      return `[${this.prefix}]${plainKey}`;
    }

    return plainKey;
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(this.prefixKey(key), JSON.stringify({ value }));
  }

  public getItem<T>(key: string): T | null;
  public getItem<T>(key: string, otherwise: T): T;
  public getItem<T>(key: string, otherwise?: T): T | null {
    const data: string | null = localStorage.getItem(this.prefixKey(key));

    if (data !== null) {
      return JSON.parse(data).value;
    }

    if (otherwise) {
      return otherwise;
    }

    return null;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(this.prefixKey(key));
  }

  public clear(): void {
    localStorage.clear();
  }

  public key(index: number): string | null {
    return localStorage.key(index);
  }
}

// class iStorageModule implements Storage {
//     [name: string]: any;
//     length: number;
//     clear(): void {
//         throw new Error('Method not implemented.');
//     }
//     getItem(key: string): string | null {
//         throw new Error('Method not implemented.');
//     }
//     key(index: number): string | null {
//         throw new Error('Method not implemented.');
//     }
//     removeItem(key: string): void {
//         throw new Error('Method not implemented.');
//     }
//     setItem(key: string, value: string): void {
//         throw new Error('Method not implemented.');
//     }

// }