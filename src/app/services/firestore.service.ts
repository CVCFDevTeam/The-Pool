import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  collection = firebase.firestore().collection('attendees');

  constructor() { }

  getAttendees(): Observable<any> {
    return new Observable((observer) => {
      this.collection.onSnapshot((querySnapshot) => {
        let attendees = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          attendees.push({
            key: doc.id,
            title: data.title,
            description: data.description,
            author: data.author
          });
        });
        observer.next(attendees);
      });
    });
  }
  
  getAttendee(id: string): Observable<any> {
    return new Observable((observer) => {
      this.collection.doc(id).get().then((doc) => {
        let data = doc.data();
        observer.next({
          key: doc.id,
          title: data.title,
          description: data.description,
          author: data.author
        });
      });
    });
  }
  
  postAttendees(data): Observable<any> {
    return new Observable((observer) => {
      data.forEach(x => {
        this.collection.add(JSON.parse(JSON.stringify(x))).then((doc) => {
          observer.next({
            key: doc.id,
          });
        });
      })
      
    });
  }
  
  updateAttendees(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.collection.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }
  
  deleteAttendees(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.collection.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
