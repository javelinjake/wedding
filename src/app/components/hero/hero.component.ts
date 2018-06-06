import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
    showPasswordInput: boolean = false;
    familyId: string;

    ngOnInit() {
        this.familyId = localStorage.getItem('familyId');
    }

    clearFamilyId() {
        localStorage.removeItem('familyId');
        this.showPasswordInput = true;
    }
}
