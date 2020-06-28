import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from './services/Models/user.model';
import { Message } from './services/Models/message.model';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  // Homepage
  invokeBottomBarOpenFunction = new EventEmitter();
  invokeBottomBarCloseFunction = new EventEmitter();
  invokeOpenPopupDialogFunction = new EventEmitter<any>();
  invokeClosePopupDialogFunction = new EventEmitter();
  invokeSendMessageFunction = new EventEmitter<Message>();

  // ChatPage
  invokeUserSelectedOnChatPage = new EventEmitter();

  subsVar: Subscription;

  constructor() {}

  // HomePage
  onBottomBarClickClose(): void {
    this.invokeBottomBarCloseFunction.emit();
  }

  onBottomBarClickOpen(): void {
    this.invokeBottomBarOpenFunction.emit();
  }

  showDialog(title: string, text: string): void {
    const data = [title, text];
    this.invokeOpenPopupDialogFunction.emit(data);
  }

  closeDialog(): void {
    this.invokeClosePopupDialogFunction.emit();
  }
  sendMessage(message: Message): void {
    this.invokeSendMessageFunction.emit(message);
  }

  // ChatPage
  onUserSelectedOnChatPage(user: User): void {
    this.invokeUserSelectedOnChatPage.emit(user);
  }
}
