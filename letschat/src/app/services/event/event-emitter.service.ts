import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../Models/message.model';
import { ChatCardInfo } from '../Models/ChatCardInfo.model';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  didReloadChat = true;

  // Homepage
  onBottomBarOpenFunction = new EventEmitter();
  onBottomBarCloseFunction = new EventEmitter();
  onOpenPopupDialogFunction = new EventEmitter<any>();
  onClosePopupDialogFunction = new EventEmitter();

  // ChatPage
  onNewMessage = new EventEmitter<Message[]>();
  onSelectedUser = new EventEmitter<ChatCardInfo>();

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
  onUserSelectedOnChatPage(user: ChatCardInfo): void {
    this.onSelectedUser.emit(user);
  }

  onNewMessageReceived(message: Message[]): void {
    this.onNewMessage.emit(message);
  }
}
