import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const storageRef = firebase.storage().ref();
    console.log(storageRef.child('background-images/pablo-heimplatz-317359-unsplash.jpg'));
  }

}
