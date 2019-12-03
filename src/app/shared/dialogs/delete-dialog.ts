import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.html',
})
export class DeleteDialog implements OnInit {

    first_name: string = '';
    last_name: string = '';
    promptOne: string = '';
    action: string = '';

    constructor(public dialogRef: MatDialogRef<DeleteDialog>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.promptOne = data.promptOne;
        this.action = data.action;
    }

    ngOnInit() {
    }

    onClose(): void {
        this.dialogRef.close(false);
    }
    onSave() {
        // TODO: We may want to make sure the form is validated before continuing.
        this.dialogRef.close(true);
    }

}
