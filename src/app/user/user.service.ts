import { Injectable } from '@angular/core';
import {UserModel} from './model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: UserModel;
  constructor() {
    this.user = new UserModel({
      id: '001',
      name: 'sampleUser',
      email: 'sampleUser@valami.hu',
      profilePictureUrl: 'ursl...'
    });
  }

  login() {

  }

  logout() {

  }

  getOneUser() {

  }
}
