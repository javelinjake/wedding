import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  backgroundImageUrl: Observable<string | null>;

  constructor(
    private storage: AngularFireStorage
  ) {
    const backgroundImageStorageRef = this.storage.ref('background-images/pablo-heimplatz-317359-unsplash.jpg');
    this.backgroundImageUrl = backgroundImageStorageRef.getDownloadURL();
  }

}
