import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { UserSettingsComponent } from './home/user-settings/user-settings.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth.guard';

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
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
