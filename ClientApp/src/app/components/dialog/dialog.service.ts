import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DialogComponent} from './dialog.component';
import {TaskModalComponent} from '../task-modal/task-modal.component';
import {Task} from '../../models/task';


export interface DialogData {
  title: string;
  question: string;
  result: boolean;
}

@Injectable()
export class DialogService {


  constructor(public dialog: MatDialog) {
  }

  openDialog(dialogData: DialogData): Observable<DialogData> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }

  openCreateTaskDialog(): Observable<TaskModalComponent> {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '600px',
      height: '600px',
      data: 'Create new Task'
    });
    return dialogRef.afterClosed();
  }

  openEditTaskDialog(oldTask: Task): Observable<Task> {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '600px',
      height: '600px',
      data: oldTask
    });
    return dialogRef.afterClosed();
  }

}

