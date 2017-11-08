import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'bere',
    templateUrl: './bere.component.html',
    styleUrls: ['./bere.component.css'],
}) export class BereComponent implements OnInit {
    constructor(private afDb: AngularFireDatabase, private accService: AccountService) { }

    hasBere = 'Incarcare...';
    ngOnInit(): void {
        this.accService.pageTitle = "Bere Gratis";
        const db = this.accService.user.AppUser.subscribe(u => {
            console.log(u);
            if (u['girl_vote'] !== undefined && u['boy_vote'] !== undefined) {
                if (u['bere'] !== undefined) {
                    this.hasBere = 'Deja ai primit berea ta gratis!';
                } else {
                    this.hasBere = 'Felicitari!<br>Ai o bere gratuita!';
                    db.unsubscribe();
                    this.accService.user.AppUser.update({bere: 'true'});
                }
            } else {
                this.hasBere = 'Poti primi o bere gratuita! <br> Trebuie doar sa votezi atat un baiat, cat si o fata!';
            }
        });
    }
}
