import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;

  constructor(private userService: UserService) {
    this.userService.getCurrentUser()
      .subscribe(
        user => this.user = user
      );
  }

  ngOnInit() {
  }

}
