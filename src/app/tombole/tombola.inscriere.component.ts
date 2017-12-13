import { NgForm } from '@angular/forms/src/directives';
import { ActivatedRoute, Router } from '@angular/router';
import { Tombola } from '../datatypes';
import { AccountService } from '../services/account.service';
import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'tombola-inscriere',
    // template: '{{tombola.display_name}}',
    templateUrl: './tombola.inscriere.component.html',
    styleUrls: ['./tombola.inscriere.component.css'],
}) export class InscriereTombolaComponent {
    tombola: Tombola = new Tombola();
    constructor(public af: AngularFireDatabase, public accService: AccountService, private router: Router, private route: ActivatedRoute) {
        const tombole = af.object(`/tombole/${route.snapshot.params['id']}`)
            .map(tombola => { tombola.identification = tombola.$key; return tombola; })
            .subscribe(a => { this.tombola = a; this.accService.pageTitle = a.display_name; });
    }

    addVisible = true;
    public closeAdd() {
        this.addVisible = false;
    }

    public SignToTombola(form: NgForm) {
        this.accService.registerForTombola(this.tombola, form.value);
        this.router.navigateByUrl('/tombole');
    }
}
