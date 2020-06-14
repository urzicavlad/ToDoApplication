import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DialogComponent} from './dialog.component';
import {CreateTaskModalComponent} from '../create-task-modal/create-task-modal.component';
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

  openCreateTaskDialog(): Observable<CreateTaskModalComponent> {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      width: '600px',
      height: '600px',
    });
    return dialogRef.afterClosed();
  }

  openEditTaskDialog(oldTask: Task): Observable<CreateTaskModalComponent> {
    const dialogRef = this.dialog.open(CreateTaskModalComponent, {
      width: '600px',
      height: '600px',
      data: oldTask
    });
    return dialogRef.afterClosed();
  }

}

