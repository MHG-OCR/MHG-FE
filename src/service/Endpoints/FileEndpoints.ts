import { Injectable } from "@angular/core";
import { HttpService } from "../Http/HttpService";
import { iHttpRequest } from "../Http/iHttpService";
import { iCoordinatesReq, iUploadDocumentOcrFlow, iUploadDocumentReq, iTemplateFileReq, iTemplateDocument } from "./Interfaces";
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
    // ------ get document template table ------
    public getDocumentTemplateTable() {
        return (firstValueFrom(
            this._HttpService
                .request<Array<object | string>>({ type: 'POST', path: `${this._ControllerPath}/document/table`, body: null })
        ))
    }
    // ------ get document processed table ------
    public getDocumentProcessedTable() {
        return (firstValueFrom(
            this._HttpService
                .request<Array<object | string>>({ type: 'POST', path: `${this._ControllerPath}/document/processed-table`, body: null })
        ))
    }

    // ------ upload document to ocr flow ------
    public uploadDocumentOcrFlow(args : iUploadDocumentOcrFlow) {
        return (firstValueFrom(
            this._HttpService
                .request<Array<object | string>>({ type: 'POST', path: `${this._ControllerPath}/document/ocr`, body: args })
        ))
    }
    public getTemplateDocument(args : iTemplateFileReq) {
        return (firstValueFrom(
            this._HttpService
                .request<Array<iTemplateDocument>>({ type: 'POST', path: `${this._ControllerPath}/document/template`, body: args })
        ))
    }
    public saveCoordinates(args: iCoordinatesReq) {
        return (firstValueFrom(
        this._HttpService
            .request<unknown>({ type: 'POST', path: `${this._ControllerPath}/points/upload`, body: args })
        ))
    }
    public editCoordinates(args: iCoordinatesReq) {
        return (firstValueFrom(
        this._HttpService
            .request<unknown>({ type: 'POST', path: `${this._ControllerPath}/points/upload`, body: args })
        ))
    }
}
