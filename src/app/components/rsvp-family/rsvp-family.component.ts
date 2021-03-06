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
        'Pescetarian',
        'Vegetarian',
        'Gluten free',
        'Vegan',
        'Nut allergies'
    ];
    familyAdded: boolean = false;

    constructor(
        private flashMessage: FlashMessagesService,
        private familyService: FamilyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.memberForm = this.fb.group({
            firstName: [this.member.firstName ? this.member.firstName : ''],
            lastName: [this.member.lastName ? this.member.lastName : ''],
            day: [this.member.day ? this.member.day : true],
            rsvp: [this.member.rsvp ? this.member.rsvp : false],
            rsvpno: this.member.rsvpno,
            rsvpJake: [this.member.rsvpJake ? this.member.rsvpJake : false],
            song: [this.member.song ? this.member.song : ''],
            dietry: [this.member.dietry ? this.member.dietry : 'I\'ll eat most things'],
        })

        if (this.member.rsvp) {
            this.familyAdded = true;
        }
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
                wholeFamilyData.photo = 'jakealexhappy';

                if (wholeFamilyData.members[this.i].rsvp === true && wholeFamilyData.members[this.i].rsvpno === true) {
                    wholeFamilyData.members[this.i].rsvpno = false;
                }
                
                this.familyService.updateFamily(wholeFamilyData);

                if (wholeFamilyData.members[this.i].rsvp === false) {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                    this.flashMessage.show(formValue.firstName + ' ' + formValue.lastName + ' RSVP saved', {
                        cssClass: 'message is-success', timeout: 4000
                    });
                }
            } catch (err) {
                // Show error
                this.flashMessage.show(err, {
                    cssClass: 'message is-danger', timeout: 4000
                });
            }
        }
    }

    editRsvp() {
        this.familyAdded = false;
    }

}
