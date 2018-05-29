import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { FlashMessagesService } from 'angular2-flash-messages';
import { FamilyService } from '../../services/family.service';

@Component({
    selector: 'app-add-family',
    templateUrl: './add-family.component.html',
    styleUrls: ['./add-family.component.css']
})
export class AddFamilyComponent implements OnInit {

    familyForm: FormGroup;
    familyAdded = false;
    formLoading = false;

    constructor(
        private flashMessage: FlashMessagesService,
        private familyService: FamilyService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.familyForm = this.fb.group({
            name: '',
            password: '',
            address: '',
            photo: '',
            members: this.fb.array([])
        })
    }

    get memberForms() {
        return this.familyForm.get('members') as FormArray
    }

    addMember() {

        const member = this.fb.group({
            firstName: '',
            lastName: '',
            day: true
        })

        this.memberForms.push(member);
    }

    deleteMember(i) {
        this.memberForms.removeAt(i)
    }

    async submitHandler() {
        this.formLoading = true;
        const formValue = this.familyForm.value;
        const formValid = this.familyForm.valid;

        if (!formValid) {
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'message is-warning', timeout: 4000
            });
        } else {
            // Checking if password is the same as another
            this.familyService.getFamiliesByPassword(formValue.password).subscribe(family => {
                if (family.length > 0) {
                    if (!this.formLoading) {
                        return;
                    }
                    this.flashMessage.show('Family password already used, use another', {
                        cssClass: 'message is-danger', timeout: 4000
                    });
                    this.formLoading = false;
                } else {
                    try {
                        this.familyService.newFamily(formValue);
                        console.log('Family added: ', formValue);

                        this.familyForm = this.fb.group({
                            name: '',
                            password: '',
                            address: '',
                            photo: '',
                            members: this.fb.array([])
                        })

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                        this.formLoading = false;

                        this.flashMessage.show('New family added', {
                            cssClass: 'message is-success', timeout: 4000
                        });
                    } catch (err) {
                        this.formLoading = false;
                        // Show error
                        this.flashMessage.show(err, {
                            cssClass: 'message is-danger', timeout: 4000
                        });
                        console.error(err);
                    }
                }
            });
        }

    }

}
