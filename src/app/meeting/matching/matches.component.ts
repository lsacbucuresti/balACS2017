import { Observable } from 'rxjs/Rx';
import { Conversation, Person } from '../../datatypes';
import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'matches',
    templateUrl: './matches.component.html',
    styleUrls: [ 'matches.component.css' ],
    providers: [ AccountService ]
}) export class MatchesComponent implements OnInit {
    matches: Observable<Person[]>;
    conversations: Conversation[];
    constructor (private accService: AccountService, private afDb: AngularFireDatabase) {
    }
    
    public ngOnInit(): void {
        this.matches = this.afDb.list(`/meeting/matches/${this.accService.user.firebaseUser.uid}`)
        .map(matches => {
            let t = new Array<Person>()
            matches.map(match => {
                let m = new Person;
                m.display_name = match.display_name;
                m.profile_picture = match.profile_picture;
                m.token = match.token;
                return m;
            })
            t = matches;
            return t;
        })


        this.afDb.list(`/meeting/conversations/`)
    }
}