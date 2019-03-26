import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
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
      }
    );
  }

  onSubmit() {
    console.log(this.registrationForm.value);
    this.userService.registrationToFireBaseAuth(this.registrationForm.value);
  }
}
