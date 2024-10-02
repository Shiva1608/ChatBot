import { Routes } from '@angular/router';
import { NewChatComponent } from './new-chat/new-chat.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignupComponent } from './signup/signup.component';
import { MemoriesComponent } from './memories/memories.component';

export const routes: Routes = [
  {path: 'login', component: AuthenticationComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'memories', component: MemoriesComponent},
  {path: ':id', component: NewChatComponent},
  {path: '', component: HomeComponent}
];
