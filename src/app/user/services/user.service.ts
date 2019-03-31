import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, ReplaySubject} from 'rxjs';
import {UserModel} from '../model/user-model';
import {first, flatMap, mergeMap} from 'rxjs/operators';
import {FirstnameService} from '../../firstname/firstname.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  createdUser: UserModel;
  userEmailAsUserName = new ReplaySubject<string>(1);
  isLoggedIn$ = new ReplaySubject<boolean>(1);

  public user = new ReplaySubject<UserModel>(1);

  constructor(private afDb: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private firstNameService: FirstnameService) {
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

  getAllProfileData() {
    // it is sample code from:https://medium.com/@paynoattn/3-common-mistakes-i-see-people-use-in-rx-and-the-observable-pattern-ba55fee3d031

    // initialize() {
    //   this.appParameters
    //     .map(params => params['id'])
    //     .switchMap(id => {
    //       if(id !== null && id !== undefined) {
    //         return this.getUser(id)
    //       }
    //     })
    //     .subscribe(user => this.user = user);
    // }


    // const age$ = of<number>(27, 25, 29);
    //  const age$ = this.getUserById('oeOUOcf0R3d0Qc0m17v3uha5Pof1');
    //  const name$ = this.firstNameService.getOneFirstName('-L_tB3lZJo0Uvd4uNluK');
    //
    //
    //  zip(age$, name$).pipe(
    //    map(([age, name]) => ({ age, name })),
    //  )
    //    .subscribe(x => console.log(x));


    // this.communityPostProvider.query({})
    //   .mergeMap((posts) => {
    //     return Observable.from(posts).mergeMap((post, index) => {
    //       this.communityPosts.push(post);
    //       return this.getFeaturedApi(index).map((feature) => {
    //         this.communityPosts[index] = feature;
    //         return feature;
    //       });
    //     });
    //   })
    //   .subscribe();


    this.user
      .pipe(
        mergeMap(firstNameKeys => {
          return from(Object.keys(firstNameKeys.visitedFirstNames))
            .pipe(
              mergeMap((key, index) => {
                console.log(index);
                return this.firstNameService.getOneFirstName(key);

              })
            );
        })
      )

      .subscribe(
        result => console.log(result.firstname)
      );

  }

  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  logout() {

    this.afAuth.auth.signOut();
    this.userEmailAsUserName.next(null);


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

  addSelectedFirstName(firstNameKey: string, keep: boolean): Observable<any> {
    console.log(firstNameKey, keep);
    return this.user
      .pipe(
        first()
      )
      .pipe(flatMap(
        user => {
          return this.afDb.object(`users/${user.id}/visitedFirstNames/${firstNameKey}`)
            .set(keep);
        }
      ));

  }
}
