import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {FirstnameModel} from './model/firstname-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstnameService {


  constructor(private afDb: AngularFireDatabase) {

  }

  getAllFirstNamesKeys() {

    return this.afDb.list(`firstnames`)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(function (c) {
            return c.key;
          })
        )
      );
  }


  getOneFirstName(key: string): Observable<FirstnameModel> {

    return this.afDb.object(`firstnames/${key}`)
      .snapshotChanges()
      .pipe(
        map(
          c =>
            new FirstnameModel(Object.assign(c, {
              id: c.payload.key, ...c.payload.val(),
              firstname: c.payload.key, ...c.payload.val(),
              description: c.payload.key, ...c.payload.val(),
            }))
        )
      );
  }

  setSelectedFirstName(key: string, keepIt: boolean) {

    const userId = 'ViPzYKoyIKe56uogOTr9XqzdrkK2';
    return this.afDb.object(`users/${userId}/visitedFirstNames/${key}`)
      .set(
        {
          'keepIt': keepIt
        }
      );
  }
}
