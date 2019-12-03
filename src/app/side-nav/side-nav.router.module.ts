import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideNavComponent } from './side-nav.component';
import { AuthGuardService } from '../guards/auth-guard.service';


const routes: Routes = [
    {
        path: '',
        component: SideNavComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                loadChildren: '../pages/overview/overview.module#OverviewModule'
            },
            {
                path: 'overview',
                loadChildren: '../pages/overview/overview.module#OverviewModule'
            },
            {
                path: 'attendance',
                loadChildren: '../pages/attendance/attendance.module#AttendancePageModule'
            },
            {
                path: 'checkin',
                loadChildren: '../pages/check-in/check-in.module#CheckInModule'
            },
            {
                path: 'teams',
                loadChildren: '../pages/teams/teams.module#TeamsModule'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'the-pool/overview',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class SideNavRouterModule { }
