import {Component, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  public tasks: Task[];
  public copy: Task[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(`${this.baseUrl}tasks`).subscribe(result => {
      this.tasks = result;
    }, error => console.error(error));
  }

  delete(taskId: string) {
    if (confirm(`Are you sure you want to delete the tasks with id '${taskId}'?`)) {
      this.http.delete(`${this.baseUrl}tasks/${taskId}`)
        .subscribe
        (
          result => {
            alert('Task was successfully deleted!');
            this.loadTasks();
          },
          () => alert('Cannot delete task - maybe it has comments?')
        );
    }
  }

  dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    };
  }


  filterByTitle(value: string) {
    this.tasks = this.tasks.filter(task => task.title.startsWith(value));
  }
}
