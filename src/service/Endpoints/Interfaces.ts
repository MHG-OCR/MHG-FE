export interface iUploadDocumentReq {
    filename: string;
    size: number
    base64Data: string;
}


export interface iUploadDocumentOcrFlow {
    type: eOcrFlow
    fileId: string
    base64Data: string
    fileName: string
}

export enum eOcrFlow {
    ContourSegmented = "ContourSegmented",
    BoxDetectionConfidence = "BoxDetectionConfidence",
    ConfidenceBased = "ConfidenceBased",
    Hybrid = "Hybrid",
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
