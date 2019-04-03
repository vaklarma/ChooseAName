import {Component} from '@angular/core';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';
import {FirstnameService} from '../../firstname/firstname.service';
import {FirstnameModel} from '../../firstname/model/firstname-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserModel;
  fname: string;
  public visitedFirstNames: string[];


  constructor(private userService: UserService,
              private firstNameService: FirstnameService) {

    this.userService.user
      .subscribe(
        user => {
          if (user) {
            this.user = user;

          }
        }
      );
this.visitedFirstNames = this.userService.visitedFirstnames;
  }
}
