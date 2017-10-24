import { AccountService } from '../services/account.service';
import { Tombola } from '../datatypes';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-component-tombola',
    templateUrl: './tombola.component.html',
    styleUrls: ['./tombola.component.css']
}) export class TombolaComponent {
    @Input() tombolaInfo: Tombola;

    constructor(private accService: AccountService) {}
}