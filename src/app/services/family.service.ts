import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Family } from '../models/Family';
import { Member } from '../models/Member';

@Injectable()
export class FamilyService {
  familiesCollection: AngularFirestoreCollection<Family>;
  familiesCollectionPassword: AngularFirestoreCollection<Family>;
  familyDoc: AngularFirestoreDocument<Family>;
  families: Observable<Family[]>;
  familiesPassword: Observable<Family[]>;
  family: Observable<Family>;

  constructor(private afs: AngularFirestore) { 
    this.familiesCollection = this.afs.collection('families', ref => ref.orderBy('name', 'asc'));
  }

  getFamilies(): Observable<Family[]> {
    // Get families with the id
    this.families = this.familiesCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Family;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.families;
  }

  getFamiliesByPassword(password): Observable<Family[]> {
    // Get families by password with the id
    this.familiesCollectionPassword = this.afs.collection('families', ref => ref.where('password', '==', password))

    this.familiesPassword = this.familiesCollectionPassword.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Family;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.familiesPassword;
  }

  newFamily(family: Family) {
    this.familiesCollection.add(family);
  }

  getFamily(id: string): Observable<Family> {
    this.familyDoc = this.afs.doc<Family>(`families/${id}`);
    this.family = this.familyDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Family;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.family;
  };

  updateFamily(family: Family) {
    this.familyDoc = this.afs.doc(`families/${family.id}`);
    this.familyDoc.update(family);
  }

  updateMember(family: Family, index) {
    this.familyDoc = this.afs.doc(`families/${family.id}/members/${index}`);
    this.familyDoc.update(family);
  }

  deleteFamily(family: Family) {
    this.familyDoc = this.afs.doc(`families/${family.id}`);
    this.familyDoc.delete();
  }

}