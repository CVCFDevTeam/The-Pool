import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendee } from 'src/app/models/attendee';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirestoreService {

    collectionName = '<Collection Name in Cloud Firestore>';
    collection: AngularFirestoreCollection;
    attendees: Observable<Attendee[]>;
    addedField: Boolean;

    constructor(private db: AngularFirestore) {
        this.collection = this.db.collection(this.collectionName);
    }

    getAttendees(): Observable<any> {
        return this.collection.snapshotChanges();
    }

    sortByAgeAttendees(): Observable<any> {
        return this.db.collection(this.collectionName, ref => ref.orderBy('age')).snapshotChanges();
    }

    getAttendee(id: string): Observable<any> {
        return this.collection.doc(id).get();
    }

    postAttendee(data: Attendee): Observable<any> {
        return new Observable((observer) => {
            this.collection.add(Object.assign({}, data)).then((doc) => {
                observer.next({
                    key: doc.id
                });
            });
        });
    }

    updateAttendee(id: string, data: Attendee): Observable<any> {
        return new Observable((observer) => {
            this.db.doc(this.collectionName + '/' + id).update(Object.assign({}, data)).then(() => {
                observer.next();
            });
        });

    }

    deleteAttendee(id: string): Observable<any> {
        return new Observable((observer) => {
            this.db.doc(this.collectionName + '/' + id).delete().then(() => {
                observer.next();
            });
        });
    }

    updateCheckIn(id: string): Observable<any> {
        return new Observable((observer) => {
            this.db.doc(this.collectionName + '/' + id).update(({ checked_in: true })).then(() => {
                observer.next();
            });
        });
    }

    updateRole(id: string): Observable<any> {
        return new Observable((observer) => {
            this.db.doc(this.collectionName + '/' + id).update(({ role: 'Attendee' })).then(() => {
                observer.next();
            });
        });
    }

    updateGroup(id: string, team: string) {
        this.db.doc(this.collectionName + '/' + id).update(({ team: team }));
    }


    // maybe useful in the future when checkedin column is added prior to checkin
    getNotCheckedInAttendees() {
        return this.db.collection(this.collectionName, ref => ref.where('checked_in', '==', false)).snapshotChanges();

    }
}
