import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { CurrentUser } from '../datatypes';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
}) export class LoginComponent implements OnInit {
    currUser: CurrentUser;
    loading = false;

    login() {
        this.loading = true;
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(a => {
            this.router.navigate([ '/tombole' ]);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    ngOnInit(): void {
        this.accService.pageTitle = "Tonight";
        this.accService.getUser().subscribe((user: CurrentUser) => this.currUser = user);
        this.currUser.firebaseAuthState.subscribe(a => {
            if (a.uid) {
                this.router.navigate([ '/tombole' ]);
            }
        });
    }

    constructor(private accService: AccountService, public afAuth: AngularFireAuth, private router: Router, private afDb: AngularFireDatabase) { }
}
