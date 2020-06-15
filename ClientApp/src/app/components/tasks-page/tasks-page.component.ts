import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {
  numberOfResults: 10;
  showDashboard: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  refresh() {
    console.log('Refresh table!');
  }

  toggleDashboard() {
    console.log('Toggle dashboard!');
    this.showDashboard = !this.showDashboard;
  }
}
