import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';
import { FamilyService } from '../../services/family.service';
import { Member } from '../../models/Member';
import { Family } from '../../models/Family';

@Component({
    selector: 'app-rsvp-family',
    templateUrl: './rsvp-family.component.html',
    styleUrls: ['./rsvp-family.component.css']
})
export class RsvpFamilyComponent implements OnInit {
    @Input() member: Member;
    @Input() family: Family;
    @Input() id: string;
    @Input() i: number;

    memberForm: FormGroup;
    jakes30thModal: boolean = false;
    dietrys = [
        'I\'ll eat most things',
        'Vegan',
        'Vegetarian',
        'Pestetarian',
        'Gluten free',
        'Nut allergies'
    ];

    constructor(
        private flashMessage: FlashMessagesService,
        private familyService: FamilyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.memberForm = this.fb.group({
            firstName: [this.member.firstName ? this.member.firstName : '' ],
            lastName: [this.member.lastName ? this.member.lastName : '' ],
            day: [this.member.day ? this.member.day : true ],
            rsvp: [this.member.rsvp ? this.member.rsvp : false ],
            rsvpJake: [this.member.rsvpJake ? this.member.rsvpJake : false ],
            song: [this.member.song ? this.member.song : '' ],
            dietry: [this.member.dietry ? this.member.dietry : 'I\'ll eat most things' ],
        })
    }

    async onSubmit() {
        const formValue = this.memberForm.value;
        const formValid = this.memberForm.valid;
        let wholeFamilyData = this.family;

        if (!formValid) {
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'message is-warning', timeout: 4000
            });
        } else {
            try {
                wholeFamilyData.members[this.i] = formValue;
                wholeFamilyData.id = this.id;
                this.familyService.updateFamily(wholeFamilyData);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                this.flashMessage.show(formValue.firstName + ' ' + formValue.lastName + ' RSVP saved', {
                    cssClass: 'message is-success', timeout: 4000
                });
            } catch (err) {
                // Show error
                this.flashMessage.show(err, {
                    cssClass: 'message is-danger', timeout: 4000
                });
            }
        }
    }


}
