import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { EventEmitterService } from './event-emitter.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserSettingsComponent } from './home/user-settings/user-settings.component';
import { BottomPopupComponent } from './home/bottom-popup/bottom-popup.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SignupHtmlTemplateComponent } from './home/signup-html-template/signup-html-template.component';
import { LoginHtmlTemplateComponent } from './home/login-html-template/login-html-template.component';
import { ChatComponent } from './chat/chat.component';
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import { PopupDialogComponent } from './common/info-dialog/popup-dialog/popup-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BottomPopupComponent,
    LoginComponent,
    SignupComponent,
    UserSettingsComponent,
    SignupHtmlTemplateComponent,
    LoginHtmlTemplateComponent,
    ChatComponent,
    InfoDialogComponent,
    PopupDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
  ],
  providers: [EventEmitterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
