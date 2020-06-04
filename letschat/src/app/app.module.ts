import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { EventEmitterService } from './event-emitter.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { BottomPopupComponent } from './home/bottom-popup/bottom-popup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { UserSettingsComponent } from './home/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BottomPopupComponent,
    LoginComponent,
    SignupComponent,
    UserSettingsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
