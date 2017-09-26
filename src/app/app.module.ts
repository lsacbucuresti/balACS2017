import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { TinderProfilingComponent } from './meeting/profiling.component';
import { TomboleComponent } from './tombole/tombole.component';
import { VotesComponent } from './vote/vote.component';
import { AuthGuard } from './authGuard.service';
import { AccountService } from './account.service';

const appRoutes: Routes = [
  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'home',
    component: LandingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'meeting',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vote',
    component: VotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tombole',
    component: TomboleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    UserComponent,
    AppComponent,
    LoginComponent,
    LandingComponent,
    TinderProfilingComponent,
    TomboleComponent,
    VotesComponent,
  ],
  imports: [
    BrowserModule,
    MaterializeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthGuard,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
