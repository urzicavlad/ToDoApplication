import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Route, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './components/nav-menu/nav-menu.component';
import {HomeComponent} from './components/home/home.component';
import {TaskDetailComponent} from './components/task-detail/task-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './shared/angular-material.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {TableComponent} from './components/table/table.component';
import {DialogService} from './components/dialog/dialog.service';
import {DialogComponent} from './components/dialog/dialog.component';
import {SnackbarService} from './components/snackbar/snackbar.service';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {TaskService} from './components/table/task.service';
import {TaskModalComponent} from './components/task-modal/task-modal.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SecurityService} from './core/services/security.service';
import {TokenService} from './core/services/token.service';
import {ApplicationService} from './core/services/application.service';


const routes: Route[] = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'tasks', component: TableComponent},
  {path: 'task-details/:taskId', component: TaskDetailComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TaskDetailComponent,
    LoginComponent,
    RegisterComponent,
    TableComponent,
    DialogComponent,
    ToolbarComponent,
    TaskModalComponent,
    DashboardComponent,
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
  providers: [DialogService, SnackbarService, TaskService, SecurityService, TokenService, ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
