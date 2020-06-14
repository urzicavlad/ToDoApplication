import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Task} from 'src/app/models/task';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {TaskService} from './task.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'added', 'deadline', 'importance', 'state', 'closedAt', 'numberOfComments'];
  dataSource: MatTableDataSource<Task>;
  numberOfResults: number;
  isLoadingResults = true;
  selection = new SelectionModel<Task>(false, []);

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @Output() selectedTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggle(task: Task) {
    this.selection.toggle(task);
    if (this.selection.isSelected(task)) {
      this.selectedTask.emit(task);
    }
  }

  ngAfterViewInit() {
    return this.taskService.loadTasks().subscribe(tasks => {
      this.isLoadingResults = false;
      this.numberOfResults = tasks.length;
      this.dataSource = new MatTableDataSource<Task>(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, () => {
      this.isLoadingResults = false;
    });
  }

  refresh() {
    console.log('refresh!');
    this.ngAfterViewInit();
  }

}

