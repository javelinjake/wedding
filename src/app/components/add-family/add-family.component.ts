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

  membersList = [0,1,2,3,4,5,6,7,8,9];

  family: Family = {
    name: '',
    password: '',
    address: '',
    day: true,
    photo: '',
    members: [
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      }
    ]
  }
 

  constructor(
    private flashMessage: FlashMessagesService,
    private familyService: FamilyService
  ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: Family, valid: boolean}) {
    console.log(value);
    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'message is-warning', timeout: 4000
      });
    } else {
      // Add new family
      this.familyService.newFamily(value);
      // Show message
      this.flashMessage.show('New family added', {
        cssClass: 'message is-success', timeout: 4000
      });
    }
  }

}
