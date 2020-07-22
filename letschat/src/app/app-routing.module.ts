import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserSettingsComponent } from './home/user-settings/user-settings.component';
import { EditSettingsComponent } from './home/user-settings/edit-settings/edit-settings.component';
import { SignUpPageComponent } from './home/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './home/sign-in-page/sign-in-page.component';
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
    path: 'signin',
    component: SignInPageComponent,
  },
  {
    path: 'signup',
    component: SignUpPageComponent,
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
