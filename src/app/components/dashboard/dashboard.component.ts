import { Component, OnInit } from '@angular/core';
import { FamilyService } from '../../services/family.service';

import { Family } from '../../models/Family';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  families: Family[];

  constructor(private familyService: FamilyService) { }

  ngOnInit() {
    this.familyService.getFamilies().subscribe(families => {
      this.families = families;
    });
  }

}
