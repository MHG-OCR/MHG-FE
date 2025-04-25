import { Injectable } from "@angular/core";
import { HttpService } from "../Http/HttpService";
import { iHttpRequest } from "../Http/iHttpService";
import { iUploadDocumentReq } from "./Interfaces";
import { firstValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class FileEndpoints {
    constructor(private readonly _HttpService: HttpService) { }
    private readonly _ControllerPath: string = "/api/fe"
    public uploadDocument(args: iUploadDocumentReq) {
        return (firstValueFrom(
            this._HttpService
                .request<unknown>({ type: 'POST', path: `${this._ControllerPath}/document/upload`, body: args })
        ))
    }
    public getDocumentTemplateTable() {
        return (firstValueFrom(
            this._HttpService
                .request<Array<object | string>>({ type: 'POST', path: `${this._ControllerPath}/document/table`, body: null })
        ))
    }
}