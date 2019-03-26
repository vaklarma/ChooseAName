import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  loggedIn: boolean;

  constructor(private userService: UserService) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => this.loggedIn = isLoggedIn
    );

    this.userService.userEmailAsUserName.subscribe(
      loggedInUserName => this.userName = loggedInUserName
    );

  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }
}
