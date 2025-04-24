import { Injectable } from "@angular/core";
import { HttpService } from "../Http/HttpService";
import { iHttpRequest } from "../Http/iHttpService";

@Injectable({
    providedIn: 'root',
})

export class FileEndpoints {
    constructor(private readonly _HttpService: HttpService) { }

    public uploadDocument(args: any): void {
        this._HttpService
            .request<any>({ type: 'POST', path: '/my-endpoint', body: args })
            .subscribe({
                next: (data: any) => {
                    console.log('Upload success:', data);
                },
                error: (err: any) => {
                    console.error('Upload error:', err);
                },
            });
    }
}