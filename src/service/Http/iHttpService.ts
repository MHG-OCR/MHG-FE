import { iUserStorage } from '../Auth/iAuthService';
import { AxiosHeaders, Method, RawAxiosRequestHeaders } from 'axios';

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;
export type IHttpHeaders =
  | (RawAxiosRequestHeaders & MethodsHeaders)
  | AxiosHeaders;

export interface iHttpRequest {
  type: 'GET' | 'POST' | 'PUT';
  body?: unknown;
  path: string;
  headers?:
    | string
    | {
        [name: string]: string | number | (string | number)[];
      }
    | Headers
    | undefined;
}