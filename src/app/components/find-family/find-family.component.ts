import { Component } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Family } from '../../models/Family';

@Component({
    selector: 'app-find-family',
    templateUrl: './find-family.component.html',
    styleUrls: ['./find-family.component.css']
})
export class FindFamilyComponent {
    id: string;
    family: Family = {
        password: ''
    };
    familyFound: Family[];
    findFamilyLoading = false;

    constructor(
        private familyService: FamilyService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService
    ) { }

    onSubmit({ value, valid }: { value: Family, valid: boolean }) {
        if (!valid) {
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'message is-danger', timeout: 4000
            });
        } else {
            this.findFamilyLoading = true;
            this.familyService.getFamiliesByPassword(value.password).subscribe(family => {
                this.familyFound = family;
                if (this.familyFound.length > 0) {
                    // Store id into local storage
                    localStorage.setItem('familyId', this.familyFound[0].id);
                    this.router.navigate(['/family/' + this.familyFound[0].id]);
                } else {
                    this.findFamilyLoading = false;
                    this.flashMessage.show('Incorrect password, please try again', {
                        cssClass: 'message is-danger', timeout: 4000
                    });
                }
            });
        }
    }

}