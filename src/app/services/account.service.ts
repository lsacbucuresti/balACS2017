import { Injectable } from '@angular/core';
import { CurrentUser, Person, Tombola } from '../datatypes';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AccountService {
    user: CurrentUser = new CurrentUser();
    observableUser: Observable<CurrentUser> = Observable.of(this.user);
    private AppUserData: any;
    
    public UsersMatchesFirebase: Observable<any>;

    private UsersTomboleObservable: FirebaseListObservable<any>;
    private UsersTombole: any[];

    
    constructor(public afAuth: AngularFireAuth,  private afDb: AngularFireDatabase) {
        let usr: FirebaseListObservable<any>;
        
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
                'user_id': this.user.firebaseUser.uid,
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

    fetchUser(token:String): Observable<Person> {
        return this.afDb.object(`/users/${token}`).map(person => {
            let newPerson:Person = new Person();
            newPerson.display_name = person['display_name'];
            newPerson.profile_picture = person['profile_picture'];
            return newPerson;
        });
    }
    
    getUser(): Observable < CurrentUser > {
        return this.observableUser;
    }
    
    voteForGirl(votedFor: string): void {
        if(this.user.isLogged && !this.AppUserData['girl_vote']) {
            let concurente: FirebaseListObservable<any> = this.afDb.list('girlVotes', { query: { limitToFirst:1 }});
            concurente.push({ to: votedFor, from: this.user.firebaseUser.uid });
            this.user.AppUser.update({girl_vote: true});
        }
    }
    
    isRegisteredForTombola(tombolaId: string): boolean {
        if(this.user.isLogged && this.UsersTombole.find(i => i.$key === tombolaId)) return true;
        return false;
    }

    registerForTombola(tombola: Tombola, fillData: String) {
        if(tombola != null) {
            if(!this.isRegisteredForTombola(tombola.identification)) {
                this.UsersTomboleObservable.set(tombola.identification, fillData);
            }
        }
    }
    
    saveUserMeetingScore(formData:any) {
        const userAnswers = this.afDb.object(`/meeting/${this.user.firebaseUser.uid}`);
        userAnswers.subscribe(a => {
            console.log(a);
            if(!this.hasMeetingAnswered(a)) {    
                userAnswers.update(formData);
            }
        }) 
    }
    
    hasMeetingAnswered(userData) {
        return userData.$value != null;
    }

    getMatchedPersons(): Observable<any> {
        return this.UsersMatchesFirebase;
    }
};
