import { Injectable } from '@angular/core';
import { CurrentUser } from './datatypes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AccountService {
    user: CurrentUser = new CurrentUser();
    observableUser: Observable<CurrentUser> = Observable.of(this.user);

    constructor(public afAuth: AngularFireAuth,  private afDb: AngularFireDatabase) {
        this.user.firebaseAuthState = afAuth.authState;
        this.user.firebaseAuthState.subscribe(user => {
            this.user.firebaseUser = user;
            if (this.user.firebaseUser != null) {
                this.user.isLogged = true;
                this.insertIfNotExists();
            } else {
                this.user.isLogged = false;
            }
        });
    }

    private insertIfNotExists(): void {
        let usersWithAuthId: FirebaseListObservable<any>;
        usersWithAuthId = this.afDb.list('users', {
            query: {
                orderByChild: 'user_id',
                equalTo: this.user.firebaseUser.uid
            }
        });

        usersWithAuthId.take(1).subscribe(userData => {
            if (userData.length === 0) {
                // obtain his facebook api token
                this.user.firebaseUser.getIdToken().then(token => {
                    // then save to the database
                    usersWithAuthId.push({
                        'user_id': this.user.firebaseUser.uid,
                        'display_name': this.user.firebaseUser.displayName,
                        'email': this.user.firebaseUser.email,
                        'profile_picture': this.user.firebaseUser.photoURL,
                        'fbToken': token
                    });
                });
            }
        });
    }

    getUser(): Observable < CurrentUser > {
        return this.observableUser;
    }
};
