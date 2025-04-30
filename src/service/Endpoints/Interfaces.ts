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
  topLeft: Point; //alternatively use point?
  topRight: Point;
  bottomLeft: Point;
  bottomRight: Point;
  metaData: string;
  docId: string;
}
