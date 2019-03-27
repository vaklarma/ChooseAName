import {Component, OnInit} from '@angular/core';
import {UserModel} from '../model/user-model';
import {UserService} from '../services/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserModel;
  fnames;
fdata;
  constructor(private userService: UserService) {
    this.userService.getCurrentUser()
      .pipe(
        map(
          user => {
             this.user = user;
            // //   this.fnames = user.visitedFirstNames;
            // this.fnames = Object.keys(user.visitedFirstNames);
            // this.fnames.map(
            //   data => this.fdata = Object.values(user.visitedFirstNames)
            // );

            //       this.fnames = Object.values(user.visitedFirstNames).map();

            this.fnames = Object.keys(user.visitedFirstNames).map(key => {
              return {
                key: key,
                value: user.visitedFirstNames[key]
              };
            });



          }
        )
      )
      .subscribe(


      );
  }

  ngOnInit() {
  }

}
