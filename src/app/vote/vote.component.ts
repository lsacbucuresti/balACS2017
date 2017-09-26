import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Person } from '../datatypes';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VotesComponent implements OnInit {
  concurente: Person[];
  constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase) { }
  ngOnInit(): void {
    let participants: FirebaseListObservable<any>;
    participants = this.afDb.list('votes');

    participants.subscribe(userData => {
      this.concurente = userData;
    });
    // participants.push('asdasd');
  }

}
