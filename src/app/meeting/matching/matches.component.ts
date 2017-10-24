import { AccountService } from '../../services/account.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
    selector: 'matches',
    templateUrl: './matches.component.html',
    styleUrls: [ 'matches.component.css' ],
    providers: [ AccountService ]
}) export class MatchesComponent {
    constructor (private accService: AccountService, private afDb: AngularFireDatabase) {
        
    }

    
}