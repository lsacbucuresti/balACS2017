import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { CurrentUser } from '../datatypes';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
}) export class LoginComponent implements OnInit {
    currUser: CurrentUser;

    login() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    ngOnInit(): void {
        this.accService.getUser().subscribe((user: CurrentUser) => this.currUser = user);
    }

    constructor(private accService: AccountService, public afAuth: AngularFireAuth, private router: Router, private afDb: AngularFireDatabase) {
        
        // this.authState = afAuth.authState;
        // this.authState.subscribe(
        //     authState => {
        //         this.user = authState;

        //         // if he is logged in
        //         if (this.user != null) {
        //             // we collect the users with his uid
        //             let usersWithAuthId: FirebaseListObservable<any>;
        //             usersWithAuthId = afDb.list('users',
        //             {
        //                 query: {
        //                     orderByChild: 'user_id',
        //                     equalTo: this.user.uid
        //                 }
        //             });

        //             // we need this loaded just once
        //             usersWithAuthId.take(1).subscribe(userData => {
        //                 // if he is  not in the database
        //                 if (userData.length === 0) {
        //                     // obtain his facebook api token
        //                     this.user.getIdToken().then(token => {
        //                         // then save to the database
        //                         usersWithAuthId.push({
        //                             'user_id': this.user.uid,
        //                             'display_name': this.user.displayName,
        //                             'email': this.user.email,
        //                             'profile_picture': this.user.photoURL,
        //                             'fbToken': token
        //                         });
        //                     });
        //                 }
        //             });
        //             this.router.navigate(['/user']);
        //         }
        //     }
        // );
    }
}
