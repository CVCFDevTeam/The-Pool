import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Attendee } from '../../models/attendee';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from '../constants';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: 'edit-dialog.html',
})
export class EditDialogComponent implements OnInit {
    form: FormGroup;
    attendeeName: string;

    // Lists
    sizes = Constants.SIZES;
    genders = Constants.GENDERS;
    states = Constants.STATES;
    church_list = Constants.CHURCH_LIST;
    roles = Constants.ROLES;
    paid_statuses = Constants.PAID_STATUS;
    group_leaders = Constants.GROUP_LEADERS;
    days_attendings = Constants.DAYS_ATTENDING;
    room_locations = Constants.ROOM_LOCATIONS;
    teams = Constants.TEAMS;


    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Attendee) {
        if (data) {
            this.attendeeName = data.first_name + ' ' + data.last_name;
        } else {
            this.attendeeName = 'New Attendee';
        }
    }

    ngOnInit() {
        if (this.data) {
            this.form = this.fb.group({
                first_name: [this.data.first_name],
                last_name: [this.data.last_name],
                t_shirt: [this.data.t_shirt],
                gender: [this.data.gender],
                age: [this.data.age],
                medical: [this.data.medical],
                address: [this.data.address],
                address_2: [this.data.address_2],
                city: [this.data.city],
                state: [this.data.state],
                zip_code: [this.data.zip_code],
                email: [this.data.email],
                emergency_contact_first_name: [this.data.emergency_contact_first_name],
                emergency_contact_last_name: [this.data.emergency_contact_last_name],
                emergency_contact_phone_number: [this.data.emergency_contact_phone_number],
                emergency_contact_relationship: [this.data.emergency_contact_relationship],
                your_church: [this.data.your_church],
                your_church_point_of_contact_name: [this.data.your_church_point_of_contact_name],
                your_church_point_of_contact_number: [this.data.your_church_point_of_contact_number],
                days_attending: [this.data.days_attending],
                cost: [this.data.cost],
                paid_status: [this.data.paid_status],
                room_location: [this.data.room_location],
                notes: [this.data.notes],
                role: [this.data.role],
                team: [this.data.team],
                group_leader: [this.data.group_leader],
                checked_in: [this.data.checked_in],
                discount: [this.data.discount],
                time_registered: [this.data.time_registered]
            });
        } else {
            this.form = this.fb.group({
                first_name: '',
                last_name: '',
                t_shirt: '',
                gender: '',
                age: '',
                medical: '',
                address: '',
                address_2: '',
                city: '',
                state: '',
                zip_code: '',
                email: '',
                emergency_contact_first_name: '',
                emergency_contact_last_name: '',
                emergency_contact_phone_number: '',
                emergency_contact_relationship: '',
                your_church: '',
                your_church_point_of_contact_name: '',
                your_church_point_of_contact_number: '',
                days_attending: 'Friday, Saturday, Sunday, Monday',
                cost: '155',
                paid_status: '',
                room_location: '',
                notes: '',
                role: '',
                team: '',
                group_leader: '',
                checked_in: false,
                discount: '',
                time_registered: (new Date()).toString()
            });
        }
    }

    onClose(): void {
        this.dialogRef.close();
    }
    onSave() {
        // TODO: We may want to make sure the form is validated before continuing.
        this.dialogRef.close(this.form.value);
    }

}
