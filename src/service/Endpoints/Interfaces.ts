export interface iUploadDocumentReq {
    filename: string;
    size: number
    base64Data: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface iCoordinatesReq {
  topLeft: number; //alternatively use point?
  topRight:number;
  bottomLeft: number;
  bottomRight: number;
  metaData: string;
  docId: string;
}
