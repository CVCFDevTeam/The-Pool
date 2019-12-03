# The Pool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Purpose

This custom table management system is to be used in adjacency with our CVCF Custom Registration Form here: 
https://github.com/CVCFDevTeam/Family-Registration

The idea behind this project is to display and update the data of Attendees that have registered to this camp.
Functionality includes the ability to create/update/delete Attendee information, manage Attendee information within
a variety of tables, and allow Attendees to check-in on the camp weekend.

## Setup

Simply run `ng serve` for a dev server. Nagivate to `http://localhost:4200/` to interact with the current application.

## Firebase Firestore

We use Firebase's Firestore realtime database to manage our data. We chose this technology due to it's automatic scaling (Though we currently don't need it...potentially in the future we will). We also chose this technology due to it's affordability for small scale applications like this one.

## Future Plans

This year, we're looking to get a proper backend to handle a lot of the functionality for both The Pool and Family Registration. That means a lot of the logic being done here will hopefully be moved from the application soon.

Far future goals are to modulize these applications to make them easier to be picked up by newer churches to use.

## How To Use This Project

1. Go to the constants.ts file and begin setting constants that you plan on using.
2. In app.component.ts, set the config information for accessing your Firebase data.
3. In environment.ts, set the config information that was used above.
4. In app.component.ts, set the titles for the page like "CVCF Youth Retreat 2019"
5. In the assets folder, add images for the logged in users.
6. In constants.ts, set USER_ATTENDEE to the attendee user login that is created in Firebase which only allows access to the Check In Page.
7. In firestore.service.ts, in the variable declarations, set the collection name to your corresponding Firestore collection name.
8. In attendance.page.ts, under the onExportCSV() function, set the desired file name for export.