import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private _authService: AuthService, private _router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this._authService.isAuthenticated()) {
            return true;
        }

        return this._authService.getAuth().authState.pipe(map((auth) => {
            if (auth == null) {
                this._router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }));
    }
}
