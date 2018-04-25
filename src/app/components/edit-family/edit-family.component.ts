import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Family } from '../../models/Family';

@Component({
  selector: 'app-edit-family',
  templateUrl: './edit-family.component.html',
  styleUrls: ['./edit-family.component.css']
})
export class EditFamilyComponent implements OnInit {
  id: string;
  family: Family = {
    name: ''
  }

  constructor(
    private familyService: FamilyService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get family
    this.familyService.getFamily(this.id).subscribe(family => this.family = family);
  }

  onSubmit({value, valid}: {value: Family, valid: boolean}) {
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to family
      value.id = this.id;
      // Update family
      this.familyService.updateFamily(value);
      this.flashMessage.show('Family updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/family/'+this.id]);
    }
  }

}