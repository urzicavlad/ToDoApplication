import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../table/task.service';
import {ApplicationService} from '../../core/services/application.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() selectedTask: Task;
  @Input() numberOfTasks: number;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleDashboard: EventEmitter<void> = new EventEmitter<void>();


  constructor(public taskService: TaskService, public applicationService: ApplicationService) {
  }

  onDelete() {
    console.log('Deleate view!');
    this.taskService.delete(this.selectedTask, () => this.refresh.emit());
  }

  onCreate() {
    console.log('Create view!');
    this.taskService.save(() => this.refresh.emit());
  }

  onEdit() {
    console.log('Edit view!');
    this.taskService.edit(this.selectedTask, () => this.refresh.emit());
  }

  onDashboard() {
    console.log('Dashboard view!');
    this.toggleDashboard.emit();
  }

}
