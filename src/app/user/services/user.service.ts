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

  public user = new ReplaySubject<UserModel>(1);

  constructor(private afDb: AngularFireDatabase,
              private afAuth: AngularFireAuth) {
    this.afAuth.authState
      .subscribe(
        fbAuthenticatedUser => {
          console.log('AuthState: ', fbAuthenticatedUser);
          if (fbAuthenticatedUser != null) {
            this.getUserById(fbAuthenticatedUser.uid)
              .subscribe(
                fbDetailedUserInfo => {
                  this.isLoggedIn$.next(true);
                  this.user.next(fbDetailedUserInfo);
                  this.userEmailAsUserName.next(fbDetailedUserInfo.email);
                }
              );
          } else {
            this.isLoggedIn$.next(false);
            console.log('nem vagyunk bejelentkezve');
          }

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
            gender: registrationFormObject.registrationGender,
            profilePictureUrl: registrationFormObject.registrationProfilePictureUrl,
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

  getUserById(userId: string): Observable<UserModel> {

    return this.afDb.object<UserModel>(`users/${userId}`).valueChanges();
  }

  getCurrentUser(): Observable<UserModel> {
    return this.user;
  }
}
