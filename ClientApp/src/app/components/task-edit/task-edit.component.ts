import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../../models/task';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  public task: Task;
  public

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let taskId = params.get('taskId');
      this.loadTask(taskId);
    });
  }

  loadTask(taskId: string) {
    this.http.get<Task>(`${this.baseUrl}tasks/${taskId}`).subscribe(result => {
      console.log(result);
      this.task = result;
      console.log(this.task);
    }, error => console.error(error));
  }

  updateTask() {
    this.http.put<Task>(`${this.baseUrl}tasks/${this.task.id}`, this.task).subscribe(result => {
      console.log(result);
      this.task = result;
      console.log(this.task);
    }, error => console.error(error));
  }
}
