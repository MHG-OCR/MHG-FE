export interface iTableLibActionsArgs {
  title: string;
  materialIconText?: string;
  event: (id: any) => void;
  getDynamic?: (((args: any) => iTableLibActionsArgs))
}

export interface iTableLibIsEmptyArgs {
  headers: Array<string>;
}

export abstract class iTableLibAbstract {
  abstract _isEmpty?: iTableLibIsEmptyArgs;
  abstract _data: Array<unknown>;
  abstract _actions: Array<iTableLibActionsArgs>;
  abstract _rowActions: Array<iTableLibActionsArgs>;
}