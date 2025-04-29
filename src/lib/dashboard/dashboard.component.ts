import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard-component',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less'],
    standalone: true,
    imports: [
        CommonModule,
    ]
})
export class DashboardComponent implements OnInit {
    public _data: any = {}
    ngOnInit(): void {
        this._data = {
            templates: 12,
            documentsProcessed: 354,
            accuracy: 96.7
        };
    }
}