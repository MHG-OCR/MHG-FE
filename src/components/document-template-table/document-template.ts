import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { iTableLibAbstract, iTableLibActionsArgs, iTableLibIsEmptyArgs } from "@lib/table-lib/interface";
import { TablelibComponent } from "@lib/table-lib/table-lib.component";
import { FileEndpoints } from "../../service/Endpoints/FileEndpoints";

@Component({
    selector: 'app-document-template-component',
    templateUrl: './document-template.html',
    standalone: true,
    imports: [TablelibComponent],
})
export class DocumentTemplateComponent extends iTableLibAbstract implements OnInit {
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
        var data = await this._FileEndpoints.getDocumentTemplateTable();
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
            title: 'Manage',
            event: async (id: string) => {
                this._Router.navigate(["manage-template"], {
                    state: { id: id }
                  })
            },
        },
    ];
}
