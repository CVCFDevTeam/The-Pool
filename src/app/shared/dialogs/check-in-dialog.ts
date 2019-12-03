import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-check-in-dialog',
    templateUrl: 'check-in-dialog.html',
})
export class CheckInDialogComponent implements OnInit {

    first_name: string;
    last_name: string;
    t_shirt: string;

    constructor(public dialogRef: MatDialogRef<CheckInDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.t_shirt = data.t_shirt;
    }

    ngOnInit() {

    }

    close() {
        this.dialogRef.close(true);
    }

    onUndoCheckin() {
        this.dialogRef.close(false);
    }
}
