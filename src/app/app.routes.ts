import { Routes } from '@angular/router';
import { NewChatComponent } from './new-chat/new-chat.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignupComponent } from './signup/signup.component';
export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent, pathMatch: 'full'},
  {path: 'signup', component: SignupComponent ,pathMatch:'full'},
  { path: ':id', component: NewChatComponent, pathMatch: 'full' },
];
