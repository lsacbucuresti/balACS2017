import { AccountService } from '../services/account.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { CurrentUser, Person } from '../datatypes';
import { Router } from '@angular/router';

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

  votedForGirl: boolean;
  votedForBoy: boolean;

  constructor(public afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private accService: AccountService, private router: Router) { }

  ngOnInit(): void {
    let concurente: FirebaseListObservable<any>;
    let concurenti: FirebaseListObservable<any>;

    concurente = this.afDb.list('/concurente');
    concurenti = this.afDb.list('/concurenti');

    concurente.subscribe(userData => {
      this.concurente = userData;
    });

    concurenti.subscribe(userData => {
      this.concurenti = userData;
    });

    this.accService.getUser().subscribe(i => {
      this.user = i;
    });

    this.accService.getUser().subscribe(u => {
      u.AppUser.subscribe(AppUser => {
        this.votedForBoy = AppUser['boy_vote'] ? true : false;
        this.votedForGirl = AppUser['girl_vote'] ? true : false;
      });
    });
  }

  private voteForGirl(pram: string): void {
    this.accService.voteForGirl(this.concurente[pram].display_name);
    location.reload();
  }

  private voteForBoy(pram: string): void {
    this.accService.voteForBoy(this.concurenti[pram].display_name);
    location.reload();
  }

}
