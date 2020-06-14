import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {HomeComponent} from './components/home/home.component';
import {TasksComponent} from './components/tasks/tasks.component';
import {TaskDetailComponent} from './components/task-detail/task-detail.component';
import {TaskCreateComponent} from './components/task-create/task-create.component';
import {TaskEditComponent} from './components/task-edit/task-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './shared/angular-material.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {TableComponent} from './components/table/table.component';
import {DialogService} from './components/dialog/dialog.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {SnackbarService} from './components/snackbar/snackbar.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'tasks', component: TasksComponent},
  {path: 'task-details/:taskId', component: TaskDetailComponent},
  {path: 'task-create', component: TaskCreateComponent},
  {path: 'task-edit/:taskId', component: TaskEditComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskEditComponent,
    LoginComponent,
    RegisterComponent,
    TableComponent,
    DialogComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  exports: [AngularMaterialModule],
  providers: [DialogService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
