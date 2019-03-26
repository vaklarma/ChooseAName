import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;

  constructor(private userService: UserService) {

    setTimeout( () => {
      this.userName = this.userService.userEmailAsUserName;
    }, 500);


  }

  ngOnInit() {
  }

  logout() {
      this.userService.logout();
  }
}
