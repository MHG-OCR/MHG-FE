import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { iTableLibAbstract, iTableLibActionsArgs, iTableLibIsEmptyArgs } from "@lib/table-lib/interface";
import { TablelibComponent } from "@lib/table-lib/table-lib.component";

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
        private readonly _Router: Router
    ) {
        super()
    }
    async ngOnInit() {
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
            title: 'Configure',
            event: async (id: string) => {
                this._Router.navigate(["snipping"])
            },
        },
    ];
}