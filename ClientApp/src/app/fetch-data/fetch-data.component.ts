import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public tasks: Task[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Task[]>(baseUrl + 'tasks').subscribe(result => {
      this.tasks = result;
    }, error => console.error(error));
  }
}

interface Task {
  id: string;
  title: string;
  description: string;
  added: string;
  deadline: string;
  importance: string;
  state: string;
  closedAt: string;
  numberOfComments: string;
}
