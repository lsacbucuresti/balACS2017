import { NgForm } from '@angular/forms/src/directives';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Conversation, Message } from '../../datatypes';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: [ 'chat.component.css' ],
    providers: [AccountService],
}) export class ChatComponent implements OnInit {
    constructor(private accService: AccountService, private afDb: AngularFireDatabase, private route: ActivatedRoute, private router: Router) { }
    conv: Conversation = new Conversation();
    convObservable: FirebaseObjectObservable<any>;
    
    messages: Message[];
    messagesObservable: FirebaseListObservable<any>;
    
    ngOnInit(): void {
        this.convObservable = this.afDb.object(`/meeting/conversations/${this.route.snapshot.params['id']}`);
        this.convObservable.map(cnv => {
            let c:Conversation = new Conversation();
            c.from = cnv['from'];
            c.to = cnv['to'];
            c.lastMessage = cnv['last_message'];
            return c;
        }).subscribe(c => {
            this.conv.from = c.from;
            this.conv.to = c.to;
            this.conv.lastMessage = c.lastMessage;
            this.chatSecurity();
            
            if(this.conv.otherPerson == null) {
                // Find the orther person's token
                let otherPersonToken = this.conv.from;
                if(this.conv.from == this.accService.user.firebaseUser.uid) {
                    otherPersonToken = this.conv.to;
                }
                this.afDb.object(`/users/${otherPersonToken}`).map(i => {
                    let tmp:any = {};
                    tmp['display_name'] = i.display_name;
                    tmp['profile_picture'] = i.profile_picture;
                    return tmp;
                }).take(1).subscribe(i => this.conv.otherPerson = i);
            }
        });
        
        this.messagesObservable = this.afDb.list(`/meeting/conversations/${this.route.snapshot.params['id']}/messages`);
        this.messagesObservable.subscribe(msgs => {
            this.messages = msgs;
        });
    }
    
    chatSecurity() {
        if(this.conv.from != this.accService.user.firebaseUser.uid && this.conv.to != this.accService.user.firebaseUser.uid)
            this.router.navigate([ '/meeting' ]);
    }
    
    sendMessage(messageForm: NgForm) {
        if(this.is_valid_message(messageForm.value['message'])) {
            this.messagesObservable.push({
                sender: this.accService.user.firebaseUser.uid,
                text: messageForm.value['message'],
            });
            
            this.convObservable.update({
                "last_message": messageForm.value['message'],
            });
            
            messageForm.reset();
        }
    }
    
    is_valid_message(message:String):Boolean {
        if(!message)
            return false;
        return true;
    }
}