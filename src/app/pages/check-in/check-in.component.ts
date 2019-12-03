import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Attendee } from '../../models/attendee';
import { MatSort, MatTableDataSource, MatTable, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { CheckInDialogComponent } from '../../shared/dialogs/check-in-dialog';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-check-in',
    templateUrl: './check-in.component.html'
})
export class CheckInComponent implements OnInit {
    private _ngUnsubscribe: Subject<void> = new Subject<void>();

    attendees: Observable<Attendee[]>;
    dataSource: MatTableDataSource<Attendee>;
    checkindialog = new FormGroup({});

    columnsToDisplay = ['first_name', 'last_name', 'age', 'gender', 'your_church', 'actions'];
    columnTitlesToDisplay = ['First Name', 'Last Name', 'Gender', 'Church', 'Actions'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(private firestoreService: FirestoreService, private dialog: MatDialog, private toastr: ToastrService) { }

    ngOnInit() {
        this.loadAttendees();
    }

    checkin(attendee: Attendee) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            first_name: attendee.first_name,
            last_name: attendee.last_name,
            t_shirt: attendee.t_shirt
        };
        const dialogRef = this.dialog.open(CheckInDialogComponent, dialogConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                this.firestoreService.updateCheckIn(attendee.key).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Checked In Successfully');
                },
                    (error) => {
                        this.toastr.error('Something went wrong with checking Attendee in. Contact your system admin.',
                            'Attendee Update Failed.');
                    });
            }
        });
    }

    loadAttendees() {
        this.dataSource = new MatTableDataSource();

        this.firestoreService.getAttendees().pipe(
            takeUntil(this._ngUnsubscribe),
            map(attendees => attendees.map(e => Constants.mapAttendee(e.payload.doc.id, e.payload.doc.data())))
        ).subscribe(attendees => {
            this.dataSource.data = attendees.sort((attendeeOne, attendeeTwo) => {
                if (attendeeOne.checked_in && !attendeeTwo.checked_in) {
                    return 1;
                }
                if (!attendeeOne.checked_in && attendeeTwo.checked_in) {
                    return -1;
                }
                return 0;
            });
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

    }

    applyFilter(filterValue: string) {
        // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

