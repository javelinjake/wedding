import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  family: Observable<any[]>;
  allFamilies: Observable<any[]>;
  familyPassword: '';

  constructor(
    private db: AngularFirestore
  ) {}

  getFamily() {
    const familyPasswordCollection = this.db.collection('families', ref => ref.where('password', '==', this.familyPassword));
    this.family = familyPasswordCollection.valueChanges();
  }

  getAllFamilies() {
    this.allFamilies = this.db.collection('families').valueChanges();
  }

  editFamily(password) {
    this.familyPassword = password;
    this.getFamily();
  }

  familyLogin() {
    this.getFamily();
  }

  addMember(form) {
    const familyPasswordCollection = this.db.collection('families', ref => ref.where('password', '==', this.familyPassword));
    const memberName = form.value.memberName;
    familyPasswordCollection.add({ name: memberName });
  }

  ngOnInit() {
    
  }
}