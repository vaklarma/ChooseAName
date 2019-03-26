import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService) {

  }


  login(email, password) {
  this.userService.login(email, password)
    .subscribe(
      data => console.log('Login component.ts login subscribe: ', data)
    );
  }
}
