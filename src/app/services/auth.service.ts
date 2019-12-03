import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authenticated = false;

    constructor(private firebaseAuth: AngularFireAuth) {
        firebaseAuth.authState.subscribe(authValue => {
            this.authenticated = authValue !== null;
        });
    }

    login(email: string, password: string): Promise<boolean> {
        return this.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(x => {
                return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
                    .then(value => {
                        this.authenticated = true;
                        return true;
                    })
                    .catch(err => {
                        return false;
                    });
            });
    }

    logout() {
        this.firebaseAuth
            .auth
            .signOut().then(x => {
                this.authenticated = false;
            });
    }

    authstate() {
        this.firebaseAuth
            .auth
            .onAuthStateChanged(user => {
                if (user) {
                    console.log(user);
                }
            });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    getAuth(): AngularFireAuth {
        return this.firebaseAuth;
    }

    getUserId(): Observable<firebase.User> {
        return this.firebaseAuth.user;
    }

}
