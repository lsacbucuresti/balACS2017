import { Observable } from 'rxjs/Rx';
import { Conversation, Person } from '../../datatypes';
import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
    selector: 'matches',
    templateUrl: './matches.component.html',
    styleUrls: [ 'matches.component.css' ],
    providers: [ AccountService ]
}) export class MatchesComponent implements OnInit {
    matches: Observable<Person[]>;
    conversations = [];
    constructor (private accService: AccountService, private afDb: AngularFireDatabase, private router: Router) {
    }

    public ngOnInit(): void {

        // verificare daca a raspuns la intrebari sau nu.
        const userAnswers = this.afDb.object(`/users/${this.accService.user.firebaseUser.uid}/meet_data`);
        userAnswers.take(1).subscribe(a => {
            if (!this.accService.hasMeetingAnswered(a)) {
                this.router.navigate(['/questions']);
            }
        });

        this.matches = this.afDb.list(`/meeting/matches/${this.accService.user.firebaseUser.uid}`)
        .map(matches => {
            let t = new Array<Person>();
            matches.map(match => {
                const m = new Person;
                m.display_name = match.display_name;
                m.profile_picture = match.profile_picture;
                m.token = match.token;
                return m;
            });
            t = matches;
            return t;
        });

        console.log(this.conversations);
        this.accService.pageTitle = 'Your Tonight';
        this.accService.user.AppUser.subscribe(u => {
            if (u['conversations']) {
                Object.keys(u['conversations']).forEach(element => {
                    this.afDb.object(`/meeting/conversations/${element}`).map(c => {
                        const conv: Conversation = new Conversation();
                        conv.token = c.$key;
                        conv.from = c.from;
                        conv.to = c.to;
                        conv.lastMessage = c.last_message;
                        conv.otherPerson = new Person();
                        conv.otherPerson.token = (conv.from === this.accService.user.firebaseUser.uid) ? conv.to : conv.from;
                        this.afDb.object(`/users/${conv.otherPerson.token}`).subscribe(o => {
                            conv.otherPerson.display_name = o.display_name;
                            conv.otherPerson.profile_picture = o.profile_picture;
                        });
                        return conv;
                    }).subscribe(c => {
                        if (c.lastMessage != null && c.lastMessage !== '') {
                            const index = this.conversations.map((a) => a.token).indexOf(c.token);
                            if (index === -1) {
                                this.conversations.push(c);
                            } else {
                                this.conversations[index] = c;
                            }
                        }
                    });
                });
            }

        });
    }

    startNewConversation(uid): void {
        if (this.conversations && this.conversations.filter(c => {
            const myuid = this.accService.user.firebaseUser.uid;
            if ((c.from === myuid || c.to === myuid) && (c.from === uid || c.to === uid)) {
                this.router.navigate([`/chat/${c.token}`]);
                return true;
            }
            return false;
        }).length > 0) {
            return;
        }


        this.afDb.list(`/meeting/conversations/`, {
            query: {
                limitToFirst: 0
            }
        }).push({
            from: this.accService.user.firebaseUser.uid,
            to: uid,
        }).then(a => {
            const convKey = a.key;
            const newConvObj = {};

            newConvObj[convKey] = true;

            this.afDb.object(`/users/${this.accService.user.firebaseUser.uid}/conversations/`).update(newConvObj);
            this.afDb.object(`/users/${uid}/conversations`).update(newConvObj);
            this.router.navigate([`/chat/${convKey}`]);
        });
    }
}
