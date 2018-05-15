import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settingsCollection: AngularFirestoreCollection<Settings>;
  settingsCollectionPassword: AngularFirestoreCollection<Settings>;
  settingsDoc: AngularFirestoreDocument<Settings>;
  settingsPassword: Observable<Settings[]>;
  settings: Observable<Settings>;

  constructor(private afs: AngularFirestore) { 
    this.settingsCollection = this.afs.collection('settings', ref => ref.orderBy('name', 'asc'));
  }

  getSettingsByPassword(password): Observable<Settings[]> {
    // Get settings by password with the id
    this.settingsCollectionPassword = this.afs.collection('settings', ref => ref.where('password', '==', password))

    this.settingsPassword = this.settingsCollectionPassword.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Settings;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.settingsPassword;
  }

  getSettings(id: string): Observable<Settings> {
    this.settingsDoc = this.afs.doc<Settings>(`settings/${id}`);
    this.settings = this.settingsDoc.snapshotChanges().map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Settings;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.settings;
  };

  updateSettings(settings: Settings) {
    this.settingsDoc = this.afs.doc(`settings/${settings.id}`);
    this.settingsDoc.update(settings);
  }

}