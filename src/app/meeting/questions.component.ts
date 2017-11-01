import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';

const questions=
    [
        {
            question: "quest1?",
            answers: ["answer1", "answer2", "answer3"],
            multianswer: false,
        },

        {
            question: "quest2?",
            answers: ["answer1", "answer2", "answer3"],
            multianswer: true,
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

        let questionsData: any[];
        console.log(form.value)

        //this.accService.saveUserMeetingScore(form.value);
    }
}