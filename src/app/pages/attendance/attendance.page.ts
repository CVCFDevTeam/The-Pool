import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Attendee } from '../../models/attendee';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditDialogComponent } from 'src/app/shared/dialogs/edit-dialog';
import { DeleteDialog } from 'src/app/shared/dialogs/delete-dialog';
import { Constants } from 'src/app/shared/constants';
import { AuthService } from 'src/app/services/auth.service';
import { AttendeeConfiguration } from 'src/app/models/attendee-fields';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.page.html',
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0px', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ]
})
export class AttendancePageComponent implements OnInit, OnDestroy {

    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    private editAttendeeConfig = new MatDialogConfig();
    private deleteAttendeeConfig = new MatDialogConfig();
    private defaultPredicate: any;

    private EOL = '\r\n';

    attendees: Observable<Attendee[]>;
    dataSource: MatTableDataSource<Attendee>;
    deletedAttendee: Attendee;

    columnsToDisplay =
        ['first_name', 'last_name', 't_shirt', 'age', 'gender', 'room_location', 'team', 'your_church', 'checked_in'];
    columnTitlesToDisplay =
        ['First Name', 'Last Name', 'T Shirt Size', 'Age', 'Gender', 'Room Location', 'Room Location', 'Church', 'Checked In'];

    teams: Array<string> = [];
    room_locations: Array<string> = [];
    userhasAccess: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private firestoreService: FirestoreService, public dialog: MatDialog,
        private toastr: ToastrService, private authService: AuthService) {
        authService.getUserId().pipe(
            takeUntil(this._ngUnsubscribe)
        ).subscribe(user => {
            this.userhasAccess = user.uid !== Constants.USER_ATTENDEE;
        });
        this.setDialogValues();
    }

    ngOnInit() {
        this.loadAttendees();
    }

    ngOnDestroy() {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    setDialogValues() {
        this.editAttendeeConfig.autoFocus = false;
        this.editAttendeeConfig.width = '600px';
        this.editAttendeeConfig.height = '1000px';
        this.editAttendeeConfig.position = {
            right: '0px',
        };

        this.deleteAttendeeConfig.autoFocus = true;
        this.deleteAttendeeConfig.role = 'alertdialog';
    }

    applyFilter(filterValue: string) {
        this.dataSource.filterPredicate = this.defaultPredicate;

        // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    loadAttendees() {
        this.dataSource = new MatTableDataSource();

        this.firestoreService.getAttendees().pipe(
            // tap(p => console.log(p)),
            takeUntil(this._ngUnsubscribe),
            map(attendees => attendees.map(e => Constants.mapAttendee(e.payload.doc.id, e.payload.doc.data())))
        ).subscribe(attendees => {
            this.dataSource.data = attendees;
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.defaultPredicate = this.dataSource.filterPredicate;
            this.room_locations = this.getDistinctValues(attendees, 'room_location');
            this.teams = this.getDistinctValues(attendees, 'team');
        });
    }

    createAttendee() {
        const dialogRef = this.dialog.open(EditDialogComponent, this.editAttendeeConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                const newAttendee = Constants.mapAttendee('', result);
                this.firestoreService.postAttendee(newAttendee).pipe(take(1)).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Created Successfully');
                },
                    (error) => {
                        this.toastr.error('Something went wrong with creating the Attendee. Contact your system admin.',
                            'Attendee Creation Failed.');
                    });
            }
        });
    }

    editAttendee(attendee: Attendee) {
        this.editAttendeeConfig.data = attendee;
        const dialogRef = this.dialog.open(EditDialogComponent, this.editAttendeeConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                const editedAttendee = Constants.mapAttendee(attendee.key, result);
                this.firestoreService.updateAttendee(attendee.key, editedAttendee).pipe(take(1)).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Updated Successfully');
                },
                    (error) => {
                        this.toastr.error('Something went wrong with updating the Attendee. Contact your system admin.',
                            'Attendee Update Failed.');
                    });
            }
            this.editAttendeeConfig.data = null;
        });
    }

    deleteAttendee(attendee: Attendee) {
        this.deleteAttendeeConfig.data = {
            first_name: attendee.first_name,
            last_name: attendee.last_name,
            promptOne: 'Are you sure you want to delete',
            action: 'Delete'
        };
        const dialogRef = this.dialog.open(DeleteDialog, this.deleteAttendeeConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                this.firestoreService.deleteAttendee(attendee.key).pipe(take(1)).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Deleted Successfully');

                    // Save last deleted Attendee just in case
                    this.deletedAttendee = attendee;
                },
                    (error) => {
                        this.toastr.error('Something went wrong with deleting the Attendee. Contact your system admin.',
                            'Attendee Update Failed.');
                    });
            }
        });
    }

    restoreAttendee() {
        this.deleteAttendeeConfig.data = {
            first_name: this.deletedAttendee.first_name,
            last_name: this.deletedAttendee.last_name,
            promptOne: 'Are you sure you want to restore',
            action: 'Restore'
        };

        const dialogRef = this.dialog.open(DeleteDialog, this.deleteAttendeeConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                this.firestoreService.postAttendee(this.deletedAttendee).pipe(take(1)).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Restored Successfully');
                    this.deletedAttendee = null;
                },
                    (error) => {
                        this.toastr.error('Something went wrong with restoring the Attendee. Contact your system admin.',
                            'Attendee Restore Failed.');
                    });
            }
        });
    }

    getDistinctValues(attendees: Array<Attendee>, fieldName: string): Array<string> {
        let distinctArray = [];

        attendees.forEach(attendee => {
            distinctArray.push(attendee[fieldName]);
        });

        distinctArray = distinctArray.filter((x, i, a) => a.indexOf(x) === i && x !== '' && x != null && x !== undefined).sort();

        return distinctArray;
    }

    filterByDropdown(filterValue: string, filterField: string) {
        this.dataSource.filterPredicate = function (data: Attendee) {
            return data[filterField] === filterValue;
        };
        this.dataSource.filter = filterValue;

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onExportCSV(): void {
        let csv = '';
        const FILE_NAME = '<Insert Desired Name Here>.csv';

        const headers: string[] = [];

        AttendeeConfiguration.attendeeHeaders.forEach(reportItem => {
            headers.push(reportItem.header);
        });

        csv += headers.join() + this.EOL;

        this.dataSource.data.forEach(attendee => {
            const values: string[] = [];
            AttendeeConfiguration.attendeeHeaders.forEach(reportItem => {
                values.push('' + (attendee[reportItem.field] ? attendee[reportItem.field] + '' : '').replace('', '') + '');
            });
            csv += values.join() + this.EOL;
        });

        const blob = new Blob([csv], { 'type': 'text/csv;charset=utf8;' });

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, FILE_NAME);
        } else {
            const link = document.createElement('a');

            link.href = URL.createObjectURL(blob);

            link.setAttribute('visibility', 'hidden');
            link.download = FILE_NAME;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    getRoleIcon(attendee: Attendee) {
        switch (attendee.role) {
            case Constants.ROLES[0]: // Attendee
                return 'icon ion-md-person role-icon-attendee';
            case Constants.ROLES[1]: // Leader
                return 'icon ion-md-people role-icon-leader';
            case Constants.ROLES[2]: // Staff
                return 'icon ion-md-attach role-icon-staff';
            case Constants.ROLES[3]: // Board
                return 'icon ion-md-clipboard role-icon-board';
            case Constants.ROLES[4]: // Band
                return 'icon ion-md-musical-note role-icon-band';
            case Constants.ROLES[5]: // Speaker
                return 'icon ion-md-microphone role-icon-speaker';
            case Constants.ROLES[6]: // Servants
                return 'icon ion-md-hammer role-icon-servants';
            case Constants.ROLES[7]: // Adults
                return 'icon ion-md-business role-icon-adults';
            case Constants.ROLES[8]: // Creative Arts
                return 'icon ion-md-brush role-icon-arts';
            case Constants.ROLES[9]: // Security
                return 'icon ion-md-warning role-security';
            default:
                return 'icon ion-md-help role-icon-speaker';
        }
    }

}
