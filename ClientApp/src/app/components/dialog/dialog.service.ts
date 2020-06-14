import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {DialogComponent} from './dialog.component';


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

}

