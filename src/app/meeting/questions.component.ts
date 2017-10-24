import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';

const questions=
    [
        {
            question: "quest1?",
            answers: ["answer1", "answer2", "answer3"]
        },

        {
            question: "quest2?",
            answers: ["answer1", "answer2", "answer3"]
        },
    ]

@Component({
    selector: 'meeting-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
}) export class QuestionsComponent {
    questions=questions;
    constructor(private accService: AccountService) {}
    
    public SaveAnswers(form: NgForm) {
        let strictData: any;
        strictData['is'] = form.value[0];
        strictData['search'] = form.value[1];

        let questionsData: any[];
        for(let i in form.value) 
            console.log(i);

        //this.accService.saveUserMeetingScore(form.value);
    }
}