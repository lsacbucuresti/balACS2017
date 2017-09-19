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
  items: FirebaseListObservable<any>;
  constructor(public af: AngularFireDatabase) {
    this.items = af.list('/tombole', {
      query: {
        limitToLast: 5
      }
    });
  }
}
