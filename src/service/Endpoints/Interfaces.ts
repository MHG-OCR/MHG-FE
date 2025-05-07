export interface iUploadDocumentReq {
    filename: string;
    size: number
    base64Data: string;
}

export interface iTemplateFileReq{
  // TODO: This needs to change once the endpoint is opened to the correct call params
  fileId: number;
}

export interface iTemplateDocument{
  id: number;
  document_base64: string
}


export interface iUploadDocumentOcrFlow {
    type: eOcrFlow;
    fileId: string;
    base64Data: string;
    fileName: string;
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
