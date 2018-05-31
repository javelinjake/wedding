import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Family } from '../../models/Family';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-view-family',
  templateUrl: './view-family.component.html',
  styleUrls: ['./view-family.component.css']
})
export class ViewFamilyComponent implements OnInit {
  id: string;
  family: Family;
  members: Member;

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
    this.familyService.getFamily(this.id).subscribe(
      family => {
        this.family = family;
        this.members = family.members;
      } 
    );
  }

}