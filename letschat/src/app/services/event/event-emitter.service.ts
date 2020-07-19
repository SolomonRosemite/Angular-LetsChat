import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../Models/user.model';
import { Message } from '../Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  constructor() {}

  // Homepage
  onBottomBarOpenFunction = new EventEmitter();
  onBottomBarCloseFunction = new EventEmitter();
  onOpenPopupDialogFunction = new EventEmitter<any>();
  onClosePopupDialogFunction = new EventEmitter();
  onNewMessage = new EventEmitter<Message[]>();

  // ChatPage
  invokeUserSelectedOnChatPage = new EventEmitter<string>();

  // HomePage
  onBottomBarClickClose(): void {
    this.onBottomBarCloseFunction.emit();
  }

  onBottomBarClickOpen(): void {
    this.onBottomBarOpenFunction.emit();
  }

  showDialog(title: string, text: string): void {
    const data = [title, text];
    this.onOpenPopupDialogFunction.emit(data);
  }

  closeDialog(): void {
    this.onClosePopupDialogFunction.emit();
  }

  // ChatPage
  onUserSelectedOnChatPage(uid: string): void {
    this.invokeUserSelectedOnChatPage.emit(uid);
  }

  onNewMessageReceived(message: Message[]): void {
    this.onNewMessage.emit(message);
  }
}
