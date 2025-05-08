import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { iTableLibAbstract, iTableLibActionsArgs, iTableLibIsEmptyArgs } from "@lib/table-lib/interface";
import { TablelibComponent } from "@lib/table-lib/table-lib.component";
import { FileEndpoints } from "../../service/Endpoints/FileEndpoints";

@Component({
    selector: 'app-document-processed-table-component',
    templateUrl: './document-processed-table.html',
    standalone: true,
    imports: [TablelibComponent],
})
export class DocumentProcessedTableComponent extends iTableLibAbstract implements OnInit {
    public _isEmpty?: iTableLibIsEmptyArgs;
    public _data: Array<object> = [
        {
            id: "yoh",
            created: "Today",
            fields: "23",
            processed: "1 document",
            accuracy: "68%",
            review: "N/A",
        }
    ];
    constructor(
        private readonly _Router: Router,
        private readonly _FileEndpoints: FileEndpoints,
    ) {
        super()
    }
    async ngOnInit() {
        var data = await this._FileEndpoints.getDocumentProcessedTable();
        if (typeof data[0] == 'object')
            this._data = data as Array<object>;
        else if (typeof data[0] == 'string') {
            this._data = [];
            this._isEmpty = {
                headers: data as Array<string>,
            };
        }
    }
    public _actions: Array<iTableLibActionsArgs> = [
        {
            title: 'Add New',
            event: async (args?: unknown) => {
                this._Router.navigate(["document-upload"])
            },
        },
    ];
    public _rowActions: Array<iTableLibActionsArgs> = [
        {
            title: 'Download',
            event: async (id: string) => {
                return
            },
        },
        {
            title: 'View',
            event: async (id: string) => {
                return
            },
        },
        {
            title: 'Review',
            event: async (id: string) => {
                return
            },
        },
    ];
}