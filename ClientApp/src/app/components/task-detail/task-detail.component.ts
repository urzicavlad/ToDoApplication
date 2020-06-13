import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TaskDetails} from '../../models/task-details';
import { Task } from 'src/app/models/task';
import { Comment } from 'src/app/models/comment';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  public taskDetails: TaskDetails = new TaskDetails();
  public comments: Comment[] = [];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private route: ActivatedRoute) {

  }

  loadTask(taskId: string) {
    this.http.get<Task>(`${this.baseUrl}tasks/${taskId}`).subscribe(result => {
      console.log(result);
      this.taskDetails.task = result;
      console.log(this.taskDetails);
    }, error => console.error(error));

    this.http.get<Comment[]>(`${this.baseUrl}tasks/${taskId}/comments`).subscribe(result => {
      console.log(result);
      this.taskDetails.comments = result;
      console.log(this.taskDetails);
    }, error => console.error(error));
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadTask(params.get('taskId'));
    });
  }

}
