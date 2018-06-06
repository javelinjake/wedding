import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    id: string;
    settings: Settings = {
        password: ''
    };
    settingsFound: Settings[];
    settingsLoading = false;
    canEnterSettings = false;

    constructor(
        private settingsService: SettingsService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService
    ) { }

    onSubmit({ value, valid }: { value: Settings, valid: boolean }) {
        if (!valid) {
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'message is-danger', timeout: 4000
            });
        } else {
            this.settingsLoading = true;
            this.settingsService.getSettingsByPassword(value.password).subscribe(settings => {
                this.settingsFound = settings;
                if (this.settingsFound.length > 0) {
                    this.canEnterSettings = true;
                } else {
                    this.settingsLoading = false;
                    this.flashMessage.show('Incorrect password, please try again', {
                        cssClass: 'message is-danger', timeout: 4000
                    });
                }
            });
        }
    }

}