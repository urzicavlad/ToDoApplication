import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/task';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  taskForm: FormGroup;
  submitted = false;
  successValidated = false;
  successSaved: boolean;
  loading: boolean;
  serverErrorOccurred: boolean;
  serverErrorMessage: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, @Inject('BASE_URL') private baseUrl: string) {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      deadline: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      added: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      importance: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  validateForm() {
    console.log('Form was submitted, verifying the form fields...');
    this.submitted = true;
    this.successValidated = !this.taskForm.invalid;
  }

  onSubmit() {
    this.validateForm();
    if (!this.successValidated) {
      console.log('Invalid form data passed by the user!');
    } else {
      console.log('Form is valid proceeding with register!');
      this.createTask();
    }
  }

  private createTask() {
    console.log('Create Task!');
    this.loading = true;
    const taskToBeSaved: Task = this.taskForm.getRawValue();
    console.log(taskToBeSaved);
    this.http.post(`${this.baseUrl}tasks`, taskToBeSaved).subscribe(() => {
        this.successSaved = true;
      },
      error => {
        console.log('Error in saving task: ', error);
        this.serverErrorOccurred = true;
        this.successSaved = false;
        this.loading = false;
        this.serverErrorMessage = error.error.message;
      },
      () => {
        this.successSaved = true;
        console.log('Task was saved!');
        this.loading = false;

      });

  }

}
