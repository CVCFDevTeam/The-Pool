import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AttendancePageComponent } from './attendance.page';

import {
    MatButtonModule, MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule, MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule
} from '@angular/material';


const routes: Routes = [
    {
        path: '',
        component: AttendancePageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule
    ],
    declarations: [AttendancePageComponent]
})
export class AttendancePageModule { }
