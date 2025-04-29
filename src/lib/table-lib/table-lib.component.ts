import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  iTableLibActionsArgs,
  iTableLibIsEmptyArgs,
} from './interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-lib-component',
  templateUrl: './table-lib.component.html',
  styleUrls: ['./table-lib.component.less'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TablelibComponent implements OnInit {
  private mdBreakpoint = 768; // Tailwind 'md' breakpoint

  isMobile(): boolean {
    return window.innerWidth < this.mdBreakpoint;
  }

  @HostListener('window:resize', [])
  onResize() {
    return this.isMobile();
  }
  public _currentPage = 1;
  @Input()
  public _itemsPerPage = 5;
  @Input()
  _data: Array<object> = [];
  @Input()
  _actions: Array<iTableLibActionsArgs> = [];
  @Input()
  _rowActions: Array<iTableLibActionsArgs> = [];
  @Input()
  _isEmpty?: iTableLibIsEmptyArgs;

  constructor() { }
  ngOnInit() { }
  
  get _tableHeaders() {
    if (this._isEmpty != null) {
      return this._isEmpty.headers;
    }
    if (typeof this._data[0] != 'object') return [];
    return Object.keys(this._data[0])
      .map((item) => this.splitCamelCase(item))
      .filter((header) => header != 'id');
  }
  get _tableRows() {
    return Object.values(this.paginatedData());
  }
  public _TableRowValues(args: object) {
    return Object.values(args);
  }
  private paginatedData() {
    const start = (this._currentPage - 1) * this._itemsPerPage;
    return this._data.slice(start, start + this._itemsPerPage);
  }
  public previousPage() {
    if (this._currentPage > 1) {
      this._currentPage--;
    }
  }
  public nextPage() {
    if (this._currentPage < Math.ceil(this._data.length / this._itemsPerPage)) {
      this._currentPage++;
    }
  }
  get _tableRange() {
    return `${this._currentPage * this._itemsPerPage - this._itemsPerPage + 1
      } - ${this.paginatedData().length +
      this._currentPage * this._itemsPerPage -
      this._itemsPerPage
      }`;
  }
  public _getRowId(args: any) {
    return args.id;
  }
  private splitCamelCase(input: string): string {
    return input.split(/(?=[A-Z])/).join(' ');
  }
}