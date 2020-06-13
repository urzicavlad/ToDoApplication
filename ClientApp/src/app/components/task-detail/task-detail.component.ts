import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {TaskDetails} from '../../models/task-details';
import {Task} from 'src/app/models/task';
import {Comment} from 'src/app/models/comment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  public taskDetails: TaskDetails = new TaskDetails();
  public comments: Comment[] = [];
  commentForm: FormGroup;
  submitted = false;
  successValidated = false;
  private successSaved: boolean;
  loading: boolean;
  serverErrorOccurred: boolean;
  serverErrorMessage: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
              @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required],
      important: ['', Validators.required]
    });
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

  validateForm() {
    console.log('Form was submitted, verifying the form fields...');
    this.submitted = true;
    this.successValidated = !this.commentForm.invalid;
  }

  deleteComment(commentId: number) {
    console.log('Delete comment');
    if (confirm(`Are you sure you want to delete the comment with id '${commentId}'?`)) {
      this.http.delete<Comment>(`${this.baseUrl}comments/${commentId}`).subscribe(result => {
        console.log(`Comment deleted: ${result}`);
        this.taskDetails.comments = this.taskDetails.comments.filter(comment => comment.id !== commentId);
        alert('Comment was successfully deleted!');
      }, () => alert('Cannot delete comment'));
    }
  }

  onSubmit() {
    console.log('Comment form was submitted!');
    this.validateForm();
    if (!this.successValidated) {
      console.log('Invalid form data passed by the user!');
    } else {
      console.log('Form is valid proceeding with register!');
      this.createComment();
    }
  }

  private closeModal() {
    document.getElementById('closeModalButton').click();
  }

  private createComment() {
    console.log('Create comment!');
    this.loading = true;
    const commentToBeSaved: Comment = this.commentForm.getRawValue();
    commentToBeSaved.important = JSON.parse(String(commentToBeSaved.important));
    console.log(commentToBeSaved);
    this.http.post(`${this.baseUrl}tasks/${this.taskDetails.task.id}/comments`, commentToBeSaved).subscribe(() => {
        this.successSaved = true;
      },
      error => {
        console.log('Error in saving comment task: ', error);
        this.serverErrorOccurred = true;
        this.successSaved = false;
        this.loading = false;
        this.serverErrorMessage = error.error.message;
      },
      () => {
        this.successSaved = true;
        console.log('Comment task was saved!');
        this.loading = false;
        this.closeModal();
        this.ngOnInit();
      });
  }
}
