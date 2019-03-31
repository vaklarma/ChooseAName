import {Component} from '@angular/core';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';
import {FirstnameService} from '../../firstname/firstname.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: UserModel;


  constructor(private userService: UserService,
              private firstNameService: FirstnameService) {

this.userService.getAllProfileData();
  }
}
