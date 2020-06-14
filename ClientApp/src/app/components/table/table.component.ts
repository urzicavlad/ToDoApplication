import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from 'src/app/models/task';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() displayedColumns: string[];
  @Input() dataSource: MatTableDataSource<Task>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() deleteTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();
  selection = new SelectionModel<Task>(true, []);

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
