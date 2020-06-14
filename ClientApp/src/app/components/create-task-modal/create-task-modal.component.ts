import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.css']
})
export class CreateTaskModalComponent {

  taskForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<CreateTaskModalComponent>, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public task: Task) {
    if (this.task === null) {
      this.task = new Task();
    }
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      deadline: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      added: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      importance: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    console.log(this.taskForm.getRawValue());
    this.dialogRef.close(this.taskForm.getRawValue());
  }

}
