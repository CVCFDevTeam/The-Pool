import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule, MatExpansionModule, MatButtonModule,
    MatDialogModule, MatSelectModule, MatCheckboxModule
} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckInDialogComponent } from './shared/dialogs/check-in-dialog';
import { FirestoreService } from './services/firestore.service';

// Plugins
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';

// Shared
import { EditDialogComponent } from './shared/dialogs/edit-dialog';
import { LoginModule } from './pages/login/login.module';
import { DeleteDialog } from './shared/dialogs/delete-dialog';
import { PhoneMaskDirective } from './shared/phone-mask.directive';


@NgModule({
    declarations: [
        AppComponent,
        EditDialogComponent,
        CheckInDialogComponent,
        DeleteDialog,
        PhoneMaskDirective
    ],
    entryComponents: [
        EditDialogComponent,
        CheckInDialogComponent,
        DeleteDialog
    ],
    exports: [
        PhoneMaskDirective
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, '<firebase project name>'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        ToastrModule.forRoot({
            timeOut: 7000,
            positionClass: 'toast-top-center',
            preventDuplicates: true
        }),
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        NgbModule,

        ChartsModule,

        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        LoginModule
    ],
    providers: [FirestoreService],
    bootstrap: [AppComponent]
})
export class AppModule { }
