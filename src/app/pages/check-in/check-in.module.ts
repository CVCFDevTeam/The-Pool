import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CheckInComponent } from './check-in.component';

import {
    MatButtonModule, MatDialogModule,
    MatExpansionModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule, MatSelectModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';


const routes: Routes = [
    {
        path: '',
        component: CheckInComponent
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
    ],
    declarations: [CheckInComponent]
})
export class CheckInModule { }
