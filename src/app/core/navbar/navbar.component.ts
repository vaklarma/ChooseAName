import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  isloggedIn: boolean;

  constructor(private userService: UserService,
              private router: Router) {
    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => this.isloggedIn = isLoggedIn
    );

    this.userService.userEmailAsUserName.subscribe(
      loggedInUserName => this.userName = loggedInUserName
    );

  }

  ngOnInit() {
  }

  logout() {
   const isLoggedOut = this.userService.logout();
 this.router.navigate(['user/login']);
  }
}
