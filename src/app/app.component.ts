import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

import { AccountService } from './services/account.service';
import { CurrentUser } from './datatypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: CurrentUser;

  constructor(private accService: AccountService) { }

  ngOnInit(): void {
    this.accService.updateMatches();
        const timer = Observable.timer(60000 * 5, 60000 * 5);
        timer.subscribe(t => {
          // search for matches!
          this.accService.updateMatches();
        });


    this.accService.getUser().subscribe(user => this.user = user);
  }
}
