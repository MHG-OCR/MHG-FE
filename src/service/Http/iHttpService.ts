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