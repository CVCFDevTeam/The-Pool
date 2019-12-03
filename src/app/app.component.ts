import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

const settings = {
    ssl: true,
    timestampsInSnapshots: true
};
const config = {
    apiKey: '<insert api key>',
    authDomain: '<insert auth domain>',
    databaseURL: '<insert database URL>',
    projectId: '<insert project id>',
    storageBucket: '<insert storage bucket>',
    messagingSenderId: '<insert messaging sender id>'
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    titleOne = '<Insert App Title>';
    titleTwo = 'Registration Management';
    page = 'attendeesFormPage';

    ngOnInit() {
        firebase.initializeApp(config);
        firebase.firestore().settings(settings);
    }
}
