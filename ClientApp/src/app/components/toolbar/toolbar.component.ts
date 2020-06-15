import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../table/task.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() selectedTask: Task;
  @Input() numberOfTasks: number;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleDashboard: EventEmitter<void> = new EventEmitter<void>();


  constructor(public taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.taskService.delete(this.selectedTask, () => this.refresh.emit());
  }

  onCreate() {
    this.taskService.save(() => this.refresh.emit());
  }

  onEdit() {
    this.taskService.edit(this.selectedTask, () => this.refresh.emit());
  }

  onDashboard() {
    console.log('Dashboard view!');
    this.toggleDashboard.emit();
  }

}
