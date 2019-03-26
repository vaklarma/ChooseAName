import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
errorInLoginMethod: boolean;
  constructor(private userService: UserService,
              private router: Router) {

  }


  login(email, password) {
    this.userService.login(email, password)
      .subscribe(
        data => this.router.navigate(['user/profile']),
        err => {
          this.errorInLoginMethod = err;
          console.log(err);
        }
      )
    ;
  }
}
