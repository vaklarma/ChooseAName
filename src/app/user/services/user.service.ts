import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {from} from 'rxjs';
import {UserModel} from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createdUser: UserModel;

  constructor(private afDb: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
  }

  login() {

  }

  logout() {

  }

  registrationToFireBaseAuth(registrationFormObject) {

    return from(
      this.afAuth.auth
        .createUserWithEmailAndPassword(registrationFormObject.registrationEmail, registrationFormObject.registrationPassword))
      .subscribe(
        data => {
          this.createdUser = new UserModel({
            id: data.user.uid,
            firstName: registrationFormObject.registrationFirstName,
            lastName: registrationFormObject.registrationLastName,
            email: registrationFormObject.registrationEmail,
            gender: registrationFormObject.gender
          });
          console.log('This userModel will be saved: ', this.createdUser);
          this.saveToUsersWithMoreInfo(this.createdUser);
        }
      );

  }

  saveToUsersWithMoreInfo(saveUser: UserModel) {
  return this.afDb.object(`users/${saveUser.id}`)
      .set(saveUser)
      .then(
        data => data
      )
      .catch(
        error => console.log(error)
      );

  }
}
