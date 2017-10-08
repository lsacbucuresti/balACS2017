import { AccountService } from '../account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { CurrentUser, Person } from '../datatypes';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css'],
  providers: [ AccountService ]
})
export class VotesComponent implements OnInit {
  concurente: Person[];
  concurenti: Person[];
  user: CurrentUser;

  constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private accService: AccountService) { }
  
  ngOnInit(): void {
    let concurente: FirebaseListObservable<any>;
    let concurenti: FirebaseListObservable<any>;

    concurente = this.afDb.list('concurente');
    concurenti = this.afDb.list('concurenti');

    concurente.subscribe(userData => {
      this.concurente = userData;
    });

    concurenti.subscribe(userData => {
      this.concurenti = userData;
    });

    this.accService.getUser().subscribe(i => { 
      this.user = i;
    });
  }

  private vote(pram: string): void {
    this.accService.voteForGirl(this.concurente[pram].display_name);
  }

}
