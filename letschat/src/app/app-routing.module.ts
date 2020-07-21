import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserSettingsComponent } from './home/user-settings/user-settings.component';
import { EditSettingsComponent } from './home/user-settings/edit-settings/edit-settings.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth.guard';
import { ChatAddMessengerComponent } from './chat/chat-add-messenger/chat-add-messenger.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings/edit',
    component: EditSettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addmessenger',
    component: ChatAddMessengerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
