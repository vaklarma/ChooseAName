import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        registrationFirstName: ['testFirstName'],
        registrationLastName: ['testLastName'],
        registrationEmail: ['valami@gmail.com'],
        registrationPassword: ['tryPassword'],
        registrationRepeatPassword: ['tryPassword'],
        registrationGender: ['Male'],
        registrationProfilePictureUrl: ['http://www.topvending.co.za/wp-content/uploads/2015/09/placeholder-man-grid-240x268.png'],
      }
    );
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userService.registrationToFireBaseAuth(this.registrationForm.value);
    this.router.navigate(['user/profile']);
  }
}
