import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Constants } from '../shared/constants';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html'
})
export class SideNavComponent implements OnInit {

    userhasAccess: boolean;
    userName: string;
    userPhotoLoc: string;

    constructor(public authService: AuthService, private router: Router) {
        authService.getUserId().subscribe(user => {
            this.userhasAccess = user.uid !== Constants.USER_ATTENDEE;
            this.userName = user.displayName;
            this.userPhotoLoc = user.photoURL;
        });
    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

}
