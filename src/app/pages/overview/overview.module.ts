import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { ChartsModule } from 'ng2-charts';


const routes: Routes = [
    {
        path: '',
        component: OverviewComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ChartsModule,
    ],
    declarations: [OverviewComponent]
})
export class OverviewModule { }
