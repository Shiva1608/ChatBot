import { Routes } from '@angular/router';
import { NewChatComponent } from './new-chat/new-chat.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'new-chat', component: NewChatComponent, pathMatch: 'full'},
];
