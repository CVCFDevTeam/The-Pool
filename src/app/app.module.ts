import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';

const appRoutes: Routes = [
  { path: 'attendance', component: AttendanceComponent },
  { path: '', redirectTo: '/attendance', pathMatch: 'full' },
  { path: '**', component: AttendanceComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
