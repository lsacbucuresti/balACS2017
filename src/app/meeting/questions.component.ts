import { AccountService } from '../services/account.service';
import { NgForm } from '@angular/forms/src/directives';
import { Component } from '@angular/core';

const questions =
    [
        {
            question: '1. What is your gender?',
            answers: [
                'Male',
                'Female'
            ],
            multianswer: false,
        },
        {
            question: '2. What are you interested in?',
            answers: [
                'Girls',
                'Boys',
                'Both',
                'Other'
            ],
            multianswer: false,
        },
        {
            question: '3. What is your strength?',
            answers: [
                'Intelligence',
                'Charisma',
                'Loyalty',
                'Creativity',
                'Physical Appearance'
            ],
            multianswer: false,
        },
        {
            question: '4. Which one of the following would be a perfect holiday?',
            answers: [
                'At a fancy hotel on the beach',
                'In a hut on a tropical island',
                'At a cabin near a cozy fireplace, in the mountains',
                'At a penthouse in a big city',
                'At a farm, in the countryside'
            ],
            multianswer: false,
        },
        {
            question: '5. What is most important in a relationship?',
            answers: [
                'Under 2 months',
                '2 - 6 months',
                '6 months - 1 year',
                '1 - 3 years',
                'Over 3 years'
            ],
            multianswer: false,
        },
        {
            question: '6. What is most important in a relationship? (choose 3 options)',
            answers: [
                'Flexibility',
                'Financial Status',
                'Communication',
                'Trust',
                'Cherishing your partner',
                'Respect',
                'Spending time together',
                'Sex',
                'Sexual chemistry'
            ],
            multianswer: true,
        },
        {
            question: '7. What would you define as cheating?',
            answers: [
                'Kissing another person',
                'Flirting with another person',
                'Having intercourse with another person',
                'Sexting with someone else',
                'Sleeping in the same bed'
            ],
            multianswer: false,
        },
        {
            question: '8. What are you looking for, in a partner? (choose 3 options)',
            answers: [
                'Looks',
                'Money',
                'Kindness',
                'Deep eyes',
                'Smile',
                'Ass',
                'Boobs',
                'Friendship',
                'Being good in bed'
            ],
            multianswer: true,
        },
        {
            question: '9. Which of the following do you consider an aphrodisiac?',
            answers: [
                'Chocolate covered strawberries',
                'Whipped cream',
                'Hot chillis',
                'Bananas',
                'Red Wine'
            ],
            multianswer: false,
        },
        {
            question: '10. What is your favourite sex position?',
            answers: [
                'Missionary',
                '69',
                'Reverse cowgirl',
                'Spoon',
                'The hot seat'
            ],
            multianswer: false,
        },
        {
            question: '11. How many children would you want to have?',
            answers: [
                '0',
                '1',
                '2',
                '3+',
                '3 cats/dogs'
            ],
            multianswer: false,
        }
    ];

@Component({
    selector: 'meeting-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
}) export class QuestionsComponent {
    questions= questions;
    constructor(private accService: AccountService) {}

    public SaveAnswers(form: NgForm) {
        let strictData: any;

        let questionsData: any[];
        console.log(form.value);

        // this.accService.saveUserMeetingScore(form.value);
    }
}
