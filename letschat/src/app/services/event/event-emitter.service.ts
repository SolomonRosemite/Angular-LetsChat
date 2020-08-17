import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../Models/message.model';
import { ChatCardInfo } from '../Models/ChatCardInfo.model';

interface DialogLogs {
  path: string;
  date: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  didReloadChat = true;
  dialogs: DialogLogs[] = [];

  // Homepage
  onBottomBarOpenFunction = new EventEmitter();
  onBottomBarCloseFunction = new EventEmitter();
  onOpenPopupDialogFunction = new EventEmitter<any>();
  onClosePopupDialogFunction = new EventEmitter();

  // ChatPage
  onNewMessage = new EventEmitter<Message[]>();
  onSelectedUser = new EventEmitter<ChatCardInfo>();
  onCancelUploads = new EventEmitter();

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

  onUploadCancel(): void {
    this.onCancelUploads.emit();
  }
}
