import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../table/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  open = [];
  inProgress = [];
  closed = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.taskService.loadTasks().subscribe(tasks => {
      this.open = tasks.filter(_ => _.state === 'Open').map(_ => _.title);
      this.inProgress = tasks.filter(_ => _.state === 'InProgress').map(_ => _.title);
      this.closed = tasks.filter(_ => _.state === 'Closed').map(_ => _.title);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
