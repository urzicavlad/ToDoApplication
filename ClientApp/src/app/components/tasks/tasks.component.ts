import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from 'src/app/models/task';
import {DialogData, DialogService} from '../dialog/dialog.service';
import {SnackbarData, SnackbarService} from '../snackbar/snackbar.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  public tasks: Task[];
  public columns: string[] = ['id', 'title', 'added', 'deadline', 'importance', 'state', 'closedAt', 'numberOfComments', 'operations'];


  constructor(private http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private dialogService: DialogService, private snackbarService: SnackbarService) {
  }

  private loadTasks() {
    this.http.get<Task[]>(`${this.baseUrl}tasks`).subscribe(result => {
      this.tasks = result;
    }, error => console.error(error));
  }

  delete(task: Task) {
    const dialogData: DialogData = <DialogData>{
      question: `Are you sure you want to delete the tasks with id '${task.id}'?`,
      title: `Delete task ${task.title}`,
      result: false
    };
    this.dialogService.openDialog(dialogData).subscribe(dialogDataResponse => {
      console.log('The dialog was closed');
      console.log(dialogDataResponse.result);
      if (dialogDataResponse.result) {
        this.http.delete(`${this.baseUrl}tasks/${task.id}`)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Task was successfully deleted!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              this.loadTasks();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot delete task - maybe it has comments?', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
            }
          );
      }
    });
  }


  ngOnInit(): void {
    this.loadTasks();
  }
}
