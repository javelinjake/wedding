import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FamilyService } from '../../services/family.service';

import { Family } from '../../models/Family';

@Component({
  selector: 'app-add-family',
  templateUrl: './add-family.component.html',
  styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent implements OnInit {

  family: Family = {
    name: '',
    password: '',
    address: '',
    day: true,
    photo: ''
  }

  constructor(
    private flashMessage: FlashMessagesService,
    private familyService: FamilyService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Family, valid: boolean}) {
    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new family
      this.familyService.newFamily(value);
      // Show message
      this.flashMessage.show('New family added', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

}
