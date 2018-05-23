import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    lat: number = 51.179258;
    lng: number = -2.736738;
    
    constructor() { }

    ngOnInit() {
    }

}
