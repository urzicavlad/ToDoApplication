import {Component} from '@angular/core';
import {SecurityService} from '../../core/services/security.service';
import {ApplicationService} from '../../core/services/application.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  constructor(private securityService: SecurityService, public applicationService: ApplicationService) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    this.securityService.logout();
  }

}
