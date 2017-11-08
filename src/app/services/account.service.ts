import { Injectable, OnInit } from '@angular/core';
import { CurrentUser, Person, Tombola } from '../datatypes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AccountService {
    pageTitle: String = 'Tonight';
    user: CurrentUser = new CurrentUser();
    observableUser: Observable<CurrentUser> = Observable.of(this.user);
    private AppUserData: any;

    public UsersMatchesFirebase: Observable<any>;

    private UsersTomboleObservable: FirebaseListObservable<any>;
    private UsersTombole: any[];

    constructor(public afAuth: AngularFireAuth,  private afDb: AngularFireDatabase) {
        this.user.firebaseAuthState = afAuth.authState;
        this.user.firebaseAuthState.subscribe(user => {
            this.user.firebaseUser = user;
            if (this.user.firebaseUser != null) {
                this.user.isLogged = true;
                this.loadUser();
            } else {
                this.user.isLogged = false;
            }
        });
    }

    private loadUser(): void {
        this.user.AppUser = this.afDb.object('/users/' + this.user.firebaseUser.uid);
        this.user.firebaseUser.getIdToken().then(token => {
            // then update to the database
            this.user.AppUser.update({
                'token': this.user.firebaseUser.uid,
                'display_name': this.user.firebaseUser.displayName,
                'email': this.user.firebaseUser.email,
                'profile_picture': this.user.firebaseUser.photoURL,
                'fbToken': token
            });
        });


        this.user.AppUser.map(u => {
            this.UsersTomboleObservable = this.afDb.list(`/participants/${u.$key}`);
            this.UsersTomboleObservable.subscribe(t => {
                this.UsersTombole = t;
            });
            this.UsersMatchesFirebase = this.afDb.list(`/meeting/matches/${u.$key}`);
            return u;
        }).subscribe(u => this.AppUserData = u);
    }

    fetchUser(token: String): Observable<Person> {
        return this.afDb.object(`/users/${token}`).map(person => {
            const newPerson: Person = new Person();
            newPerson.display_name = person['display_name'];
            newPerson.profile_picture = person['profile_picture'];
            return newPerson;
        });
    }

    getUser(): Observable < CurrentUser > {
        return this.observableUser;
    }

    voteForGirl(votedFor: string): void {
        if (this.user.isLogged && !this.AppUserData['girl_vote']) {
            const concurente: FirebaseListObservable<any> = this.afDb.list('girlVotes', { query: { limitToFirst: 1 }});
            concurente.push({ to: votedFor, from: this.user.firebaseUser.uid });
            this.user.AppUser.update({girl_vote: true});
        }
    }

    voteForBoy(votedFor: string): void {
        if (this.user.isLogged && !this.AppUserData['boy_vote']) {
            const concurente: FirebaseListObservable<any> = this.afDb.list('boyVotes', { query: { limitToFirst: 1 }});
            concurente.push({ to: votedFor, from: this.user.firebaseUser.uid });
            this.user.AppUser.update({boy_vote: true});
        }
    }

    isRegisteredForTombola(tombolaId: string): boolean {
        if (this.user.isLogged && this.UsersTombole.find(i => i.$key === tombolaId)) {
            return true;
        }
        return false;
    }

    registerForTombola(tombola: Tombola, fillData: String) {
        if (tombola != null) {
            if (!this.isRegisteredForTombola(tombola.identification)) {
                this.UsersTomboleObservable.set(tombola.identification, fillData);
            }
        }
    }

    saveUserMeetingScore(formData: any) {
        const userAnswers = this.afDb.object(`/users/${this.user.firebaseUser.uid}/meet_data`);
        userAnswers.take(1).subscribe(a => {
            if (!this.hasMeetingAnswered(a)) {
                userAnswers.update(formData);
            }
        });
    }

    hasMeetingAnswered(userData) {
        return userData.$value === undefined;
    }

    getMatchedPersons(): Observable<any> {
        return this.UsersMatchesFirebase;
    }

    updateMatches() {
        this.afDb.list('/users/').take(1).subscribe(allUsers => {
            let scores = [];
            const myAnswers = this.AppUserData.meet_data;
            if (!myAnswers) {
                return;
            }
            allUsers.forEach(user => {
                if (user.meet_data !== undefined) {
                    if (user.$key !== this.user.firebaseUser.uid) {
                        if (myAnswers[1] === '2' || user.meet_data[0] === myAnswers[1] && myAnswers[0] === user.meet_data[1]) {
                            let score = 0;
                            Object.keys(user.meet_data).forEach(question => {
                                if (myAnswers[question] !== undefined) {
                                    score += (myAnswers[question] === user.meet_data[question]) ? 1 : 0;
                                }
                            });

                            scores.push({scor: score, user: user});
                        }
                    }
                }
            });
            scores = scores.sort((u1, u2) => u1.scor - u2.scor);
            if (scores.length > 0) {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/0`).set(scores[0].user);
            } else {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/0`).set({display_name: '', profile_picture: ''});
            }

            if (scores.length > 1) {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/1`).set(scores[1].user);
            } else {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/1`).set({display_name: '', profile_picture: ''});
            }

            if (scores.length > 2) {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/2`).set({display_name: '', profile_picture: ''});
            } else {
                this.afDb.object(`/meeting/matches/${this.user.firebaseUser.uid}/2`).set({display_name: '', profile_picture: ''});
            }
        });
    }
}
