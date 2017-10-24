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

    login() {
        this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    ngOnInit(): void {
        this.accService.getUser().subscribe((user: CurrentUser) => this.currUser = user);
    }

    constructor(private accService: AccountService, public afAuth: AngularFireAuth, private router: Router, private afDb: AngularFireDatabase) { }
}
