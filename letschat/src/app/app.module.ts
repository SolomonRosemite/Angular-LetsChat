// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { environment } from 'src/environments/environment';
// import { AngularFireModule } from '@angular/fire';

// @NgModule({
//   declarations: [AppComponent],
//   imports: [
//     AngularFireModule.initializeApp(environment.firebase),
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//   ],
//   providers: [],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}
import { DatePipe } from '@angular/common';
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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DatabaseService } from './services/database/database.service';
import { EventEmitterService } from './services/event/event-emitter.service';

import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { UserSettingsComponent } from './home/user-settings/user-settings.component';
import { BottomPopupComponent } from './home/bottom-popup/bottom-popup.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { InfoDialogComponent } from './home/info-dialog/info-dialog.component';
import { PopupDialogComponent } from './home/info-dialog/popup-dialog/popup-dialog.component';
import { ChatPageComponent } from './chat/chat-page/chat-page.component';
import { ChatNavbarComponent } from './chat/chat-navbar/chat-navbar.component';
import { OpenChatsComponent } from './chat/chat-page/open-chats/open-chats.component';
import { ChatCardComponent } from './chat/chat-page/open-chats/chat-card/chat-card.component';
import { ChatInfoComponent } from './chat/chat-page/chat-info/chat-info.component';
import { FileReferenceCardComponent } from './chat/common/file-reference-card/file-reference-card.component';
import { ChatMessagesPageComponent } from './chat/chat-page/chat-messages-page/chat-messages-page.component';
import { EditSettingsComponent } from './home/user-settings/edit-settings/edit-settings.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatAddMessengerComponent } from './chat/chat-add-messenger/chat-add-messenger.component';
import { AddMessengerDialogComponent } from './chat/chat-add-messenger/add-messenger-dialog/add-messenger-dialog.component';
import { SignInPageComponent } from './home/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './home/sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BottomPopupComponent,
    UserSettingsComponent,
    InfoDialogComponent,
    PopupDialogComponent,
    ChatPageComponent,
    ChatNavbarComponent,
    OpenChatsComponent,
    ChatCardComponent,
    ChatInfoComponent,
    FileReferenceCardComponent,
    ChatMessagesPageComponent,
    EditSettingsComponent,
    ChatAddMessengerComponent,
    AddMessengerDialogComponent,
    SignInPageComponent,
    SignUpPageComponent,
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
    MatSelectModule,
    MatInputModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [EventEmitterService, DatabaseService, AngularFirestore, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
