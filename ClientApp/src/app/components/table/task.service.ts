import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DialogData, DialogService} from '../dialog/dialog.service';
import {SnackbarData, SnackbarService} from '../snackbar/snackbar.service';
import {Observable} from 'rxjs';
import {Task} from '../../models/task';

@Injectable()
export class TaskService {

  constructor(private _http: HttpClient,
              @Inject('BASE_URL') private baseUrl: string,
              private dialogService: DialogService,
              private snackbarService: SnackbarService) {
  }

  getTasks(sort: string, order: string, page: number): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.baseUrl}tasks`);
  }

  loadTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(`${this.baseUrl}tasks`);
  }

  save(refreshDataCallback: Function) {
    this.dialogService.openCreateTaskDialog().subscribe(taskToBeSaved => {
      console.log('The dialog was closed');
      console.log(taskToBeSaved);
      if (taskToBeSaved) {
        this._http.post<Task>(`${this.baseUrl}tasks`, taskToBeSaved)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Task was successfully saved!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot save task - maybe it is our fault!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            }
          );
      }
    });
  }

  edit(oldTask: Task, refreshDataCallback: Function) {
    this.dialogService.openEditTaskDialog(oldTask).subscribe(taskToBeSaved => {
      console.log('The dialog was closed');
      console.log(taskToBeSaved);
      if (taskToBeSaved) {
        this._http.put<Task>(`${this.baseUrl}tasks/${oldTask.id}`, taskToBeSaved)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Task was successfully saved!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot save task - maybe it is our fault!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            }
          );
      }
    });
  }

  delete(task: Task, refreshDataCallback: Function) {
    const dialogData: DialogData = <DialogData>{
      question: `Are you sure you want to delete the tasks with id '${task.id}'?`,
      title: `Delete task ${task.title}`,
      result: false
    };
    this.dialogService.openDialog(dialogData).subscribe(dialogDataResponse => {
      console.log('The dialog was closed');
      console.log(dialogDataResponse.result);
      if (dialogDataResponse.result) {
        this._http.delete(`${this.baseUrl}tasks/${task.id}`)
          .subscribe
          (
            () => {
              const snackBar = <SnackbarData>{message: 'Task was successfully deleted!', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            },
            () => {
              const snackBar = <SnackbarData>{message: 'Cannot delete task - maybe it has comments?', action: 'Close', duration: 2000};
              this.snackbarService.openSnackBar(snackBar);
              refreshDataCallback();
            }
          );
      }
    });
  }

}
