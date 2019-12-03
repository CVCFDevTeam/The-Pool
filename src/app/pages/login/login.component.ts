import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    email: string;
    password: string;

    constructor(public authService: AuthService, private router: Router,
        private toastr: ToastrService) { }

    ngOnInit() {

    }

    login() {
        this.authService.login(this.email, this.password).then(wasSuccessful => {
            if (wasSuccessful) {
                this.toastr.success('Navigating you to The Pool', 'Login Successful');
                this.router.navigate(['the-pool']);
            } else {
                this.toastr.error('Please check your login information to make sure it is correct', 'Login Failed');
            }

            this.email = this.password = '';
        });
    }

    logout() {
        this.authService.logout();
    }



}
