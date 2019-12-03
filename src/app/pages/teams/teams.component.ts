import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Attendee } from '../../models/attendee';
import { MatSort, MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/shared/constants';
import { DeleteDialog } from 'src/app/shared/dialogs/delete-dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-teams',
    templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit, OnDestroy {
    private _ngUnsubscribe: Subject<void> = new Subject<void>();
    Attendees: Observable<Attendee[]>;
    dataSource: MatTableDataSource<Attendee>;
    userhasAccess: boolean;

    teams = Constants.TEAMS;
    leaders = Constants.LEADERS;
    coleaders = Constants.COLEADERS;

    selectedTeam: string;
    selectedTeamNumber: number;

    columnsToDisplay = ['first_name', 'last_name', 'age', 'gender', 'room_location', 'your_church', 'checked_in'];
    columnTitlesToDisplay = ['First Name', 'Last Name', 'Age', 'Gender', 'Room', 'Church', 'Checked In'];
    colors = ['#3E65E4', '#810081', '#006500', '#FF0000', '#FFE100', '#FF65B4', '#008080', '#4fd195', '#C0C0C0', '#d3522e',
        '#ffae19', '#654321', '#c4be6d', '#02076c'];

    attendeeList: Array<Attendee> = [];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable<any>;

    constructor(
        private firestoreService: FirestoreService,
        private dialog: MatDialog,
        private toastr: ToastrService,
        private authService: AuthService) {

        authService.getUserId().pipe(
            takeUntil(this._ngUnsubscribe)
        ).subscribe(user => {
            this.userhasAccess = user.uid !== Constants.USER_ATTENDEE;
        });
    }

    ngOnInit() {
        this.loadAttendees();
    }

    ngOnDestroy() {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    loadAttendees() {
        this.dataSource = new MatTableDataSource();

        this.firestoreService.sortByAgeAttendees().pipe(
            takeUntil(this._ngUnsubscribe),
            map(Attendees => Attendees.map(e => Constants.mapAttendee(e.payload.doc.id, e.payload.doc.data())))
        ).subscribe(Attendees => {
            this.attendeeList = Attendees;
            if (this.selectedTeam) {
                this.dataSource.data = Attendees.filter(attendee => {
                    return attendee.team === this.selectedTeam;
                });
                this.dataSource.sort = this.sort;
            } else {
                this.dataSource.data = Attendees;
                this.dataSource.sort = this.sort;
            }
        });
    }

    // Randomizing attendees
    shuffle(list) {
        for (let j, x, i = list.length; i; j = Math.floor(Math.random() * i), x = list[--i], list[i] = list[j], list[j] = x) { }
        return list;
    }

    assignRoles() {
        this.attendeeList.forEach(attendee => {
            if (!attendee.role || attendee.role === '') {
                this.firestoreService.updateRole(attendee.key).subscribe(r => {
                    this.toastr.success('Excellent!', 'Attendee Role Assigned Successfully');
                },
                    (error) => {
                        this.toastr.error('Something went wrong with assigned an Attendee role. Contact your system admin.',
                            'Attendee Update Failed.');
                    });
            }
        });
    }

    generate() {

        this.assignRoles();

        // Push data into an array so front end query can be applied
        const allAttendees = [];
        this.attendeeList.forEach(attendee => {
            allAttendees.push(attendee);
        });
        // get only female attendees
        let femaleAttendees = allAttendees.filter(
            attendee => attendee.gender === 'Female' && attendee.role === 'Attendee');
        // get only male attendees
        let maleAttendees = allAttendees.filter(
            attendee => attendee.gender === 'Male' && attendee.role === 'Attendee');

        femaleAttendees = this.shuffle(femaleAttendees);
        maleAttendees = this.shuffle(maleAttendees);

        const numFemales = femaleAttendees.length;
        const numMales = maleAttendees.length;
        const numGroups = 7;
        // Take floor because for sure each group will have this number of females
        const numFemalesPerGroup = Math.floor((numFemales / numGroups));
        // Take floor because for sure each group will have this number of males
        const numMalesPerGroup = Math.floor((numMales / numGroups));
        // remaining number of female attendees
        const femaleRemainder = numFemales % numGroups;
        // remaining number of male attendees
        const maleRemainder = numMales % numGroups;

        this.addTeamToAttendee(femaleAttendees, numGroups, numFemalesPerGroup);
        this.addTeamToAttendee(maleAttendees, numGroups, numMalesPerGroup);
        this.addTeamToRemainingAttendee(femaleAttendees, numGroups, femaleRemainder, 'female');
        this.addTeamToRemainingAttendee(maleAttendees, numGroups, maleRemainder, 'male');

        this.toastr.success('Excellent!', 'Attendee Teams Assigned Successfully');
    }

    // Add team to known minimum number of male and female attendees to each team
    addTeamToAttendee(attendee: Attendee[], numberOfGroups: number, numberPerGroup: number) {
        let count = 0;
        let groupIndex = numberOfGroups;
        while (groupIndex > 0) {
            for (let i = 0; i < numberPerGroup; i++) {
                this.firestoreService.updateGroup(attendee[count].key, Constants.TEAMS[groupIndex - 1]);
                count++;
            }
            groupIndex--;
        }
    }

    // Add team to remaining number of female and male attendees.
    // Add one attendee to each group until all remianing attendees are accounted for.
    // Females and males start at opposite ends of TEAMS to make sure groups will only have at most one extra attendee
    addTeamToRemainingAttendee(attendee: Attendee[], numberOfGroups: number, remainder: number, gender: string) {
        let count = attendee.length - remainder;
        let groupIndex: number;

        // Start adding remaining female attendees from group 1
        if (gender === 'female') {
            groupIndex = 1;
            while (remainder > 0) {
                this.firestoreService.updateGroup(attendee[count].key, Constants.TEAMS[groupIndex - 1]);
                count++;
                remainder--;
                groupIndex++;
            }
        // Start adding remainng male attendees from group 7
        } else {
            groupIndex = numberOfGroups;
            while (remainder > 0) {
                this.firestoreService.updateGroup(attendee[count].key, Constants.TEAMS[groupIndex - 1]);
                count++;
                remainder--;
                groupIndex--;
            }
        }

    }

    chooseTeam(team: string) {
        this.selectedTeam = team;
        this.selectedTeamNumber = this.teams.indexOf(team);

        const filteredAttendees = this.attendeeList.filter(attendee => {
            return attendee.team === team;
        });

        this.dataSource.data = filteredAttendees;
        this.dataSource.sort = this.sort;
    }

    changeTeam(attendee: Attendee, team: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
            first_name: attendee.first_name,
            last_name: attendee.last_name,
            promptOne: 'Move',
            action: 'Move'
        };
        const dialogRef = this.dialog.open(DeleteDialog, dialogConfig);

        dialogRef.beforeClosed().subscribe(result => {
            if (result) {
                this.firestoreService.updateGroup(attendee.key, team);
            }
        });
    }
}

