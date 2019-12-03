import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SideNavRouterModule } from './side-nav.router.module';

import { SideNavComponent } from './side-nav.component';
import { AuthGuardService } from '../guards/auth-guard.service';

import {
    MatListModule,
    MatSidenavModule,
    MatMenuModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SideNavRouterModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule
    ],
    declarations: [
        SideNavComponent
    ],
    exports: [
        MatSidenavModule,
        MatMenuModule
    ],
    providers: [AuthGuardService]
})
export class SideNavComponentModule { }
