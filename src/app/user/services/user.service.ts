import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserModel} from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createdUser: UserModel;
  userEmailAsUserName = new ReplaySubject<string>(1);
  isLoggedIn$ = new ReplaySubject<boolean>(1);

  public user = new ReplaySubject<any>(1);

  constructor(private afDb: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .subscribe(
        remoteUser => {


          if (remoteUser != null) {
            this.isLoggedIn$.next(true);
            this.user.next(remoteUser);
            this.userEmailAsUserName.next(remoteUser.email);

          } else {
            this.isLoggedIn$.next(false);
            console.log('nem vagyunk bejelentkezve');
          }
          console.log('AuthState: ', remoteUser);
        }
      );
  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): boolean {
    let isLoggedOutSuccess;
    this.afAuth.auth.signOut();
    this.userEmailAsUserName.next(null);

    this.isLoggedIn$.subscribe(
      isLoggedIn => isLoggedOutSuccess = isLoggedIn
    );
    return !isLoggedOutSuccess;
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
