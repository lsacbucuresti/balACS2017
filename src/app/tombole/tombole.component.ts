import { AccountService } from '../services/account.service';
import { Component } from '@angular/core';
import { Tombola } from '../datatypes';
import { AngularFireModule } from 'angularfire2';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-tombole',
  templateUrl: './tombole.component.html',
  styleUrls: ['./tombole.component.css']
})
export class TomboleComponent {
  tombole: Tombola[];
  constructor(public af: AngularFireDatabase, public accService: AccountService) {
    this.accService.pageTitle = "Tombole";
    const tombole = af.list('/tombole').map(tbl => {
      tbl.map(tombola => tombola.identification = tombola.$key);
      return tbl;
    }).subscribe(a => {
      this.tombole = a;
    });
  }
}
