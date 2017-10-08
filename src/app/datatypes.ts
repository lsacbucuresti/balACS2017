import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseObjectObservable } from 'angularfire2/database';

export class Tombola {
    identification: string;
    display_name: string;
    media_type: string;
    media_url: string;
    required_fields: string[];
}

export class Person {
    display_name: string;
    description: string;
    profile_picture: string;
}

export class CurrentUser {
    isLogged: boolean;
    firebaseAuthState: Observable<firebase.User>;
    firebaseUser: firebase.User;
    AppUser: FirebaseObjectObservable<any>;
}
