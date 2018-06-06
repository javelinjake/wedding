import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jakes-30th',
  templateUrl: './jakes-30th.component.html',
  styleUrls: ['./jakes-30th.component.scss']
})
export class Jakes30thComponent implements OnInit {

  @Input() jakes30thModal: boolean;

  constructor() { }

  ngOnInit() {
  }

}
