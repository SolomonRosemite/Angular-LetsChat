import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DatabaseService } from './services/database/database.service';
import { EventEmitterService } from './event-emitter.service';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import { PopupDialogComponent } from './common/info-dialog/popup-dialog/popup-dialog.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { ChatNavbarComponent } from './chat/chat-navbar/chat-navbar.component';
import { OpenChatsComponent } from './chat/chat-page/open-chats/open-chats.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ChatCardComponent } from './chat/chat-page/open-chats/chat-card/chat-card.component';
import { ChatInfoComponent } from './chat/chat-page/chat-info/chat-info.component';
import { FileReferenceCardComponent } from './chat/common/file-reference-card/file-reference-card.component';
import { ChatMessagesPageComponent } from './chat/chat-page/chat-messages-page/chat-messages-page.component';

@NgModule({
  declarations: [
    SignupHtmlTemplateComponent,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BottomPopupComponent,
    LoginComponent,
    SignupComponent,
    UserSettingsComponent,
    LoginHtmlTemplateComponent,
    InfoDialogComponent,
    PopupDialogComponent,
    ChatPageComponent,
    ChatNavbarComponent,
    OpenChatsComponent,
    MyProfileComponent,
    ChatCardComponent,
    ChatInfoComponent,
    FileReferenceCardComponent,
    ChatMessagesPageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatToolbarModule,
    TextFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [EventEmitterService, DatabaseService, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
