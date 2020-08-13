import { Upload } from './../../services/Models/upload.model';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { StorageService } from './../../services/storage/storage.service';
import { ChatCardInfo } from 'src/app/services/Models/ChatCardInfo.model';
import { Message } from './../../services/Models/message.model';
import { Component, OnInit, HostListener } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event/event-emitter.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { User } from 'src/app/services/Models/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  constructor(
    private eventEmitterService: EventEmitterService,
    private database: DatabaseService,
    private auth: AuthService,
    public dialog: MatDialog,
    private storageService: StorageService
  ) {}

  me: User;
  chatCardInfo: ChatCardInfo;
  message = '';

  smallScreenLimit = 1450;
  useSmallScreen = false;

  ngOnInit(): void {
    if (window.innerWidth < this.smallScreenLimit) {
      this.useSmallScreen = true;
    } else {
      this.useSmallScreen = false;
    }

    this.eventEmitterService.onSelectedUser.subscribe(
      (user: ChatCardInfo) => (this.chatCardInfo = user)
    );

    this.auth.getUser().then((user) => {
      this.me = user;

      const date = new Date().getTime();

      const messages = this.database.receiveMessages(this.me).ref;
      const query = messages.orderBy('timestamp').startAt(date);

      query.onSnapshot((items) => {
        let messages: Message[] = [];

        items.docChanges().forEach((element) => {
          const item = element.doc.data();

          messages.push({
            chatId: item.chatId,
            message: item.message,
            receiverDisplayName: item.receiverDisplayName,
            receiverPhotoURL: item.receiverPhotoURL,
            receiverUid: item.receiverUid,
            senderDisplayName: item.senderDisplayName,
            senderPhotoURL: item.senderPhotoURL,
            senderUid: item.senderUid,
            timestamp: (item.timestamp as firebase.firestore.Timestamp).toDate(),
          });
        });

        this.eventEmitterService.onNewMessageReceived(messages);
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.useSmallScreen =
      window.innerWidth < this.smallScreenLimit ? true : false;
  }

  sendMessage(event): void {
    if (
      (event != null && event.keyCode != 13) ||
      !this.chatCardInfo ||
      this.message.length == 0
    ) {
      return;
    }

    let uid = this.chatCardInfo.senderUid;

    if (this.me.uid === this.chatCardInfo.senderUid) {
      uid = this.chatCardInfo.receiverUid;
    }

    const message = new Message({
      chatId: this.getChatId(this.me.uid, uid),
      message: this.message,

      receiver: uid,
      receiverPhotoURL: this.chatCardInfo.photoURL,
      receiverDisplayName: this.chatCardInfo.displayName,

      sender: this.me.uid,
      senderPhotoURL: this.me.photoURL,
      senderDisplayName: this.me.displayName,

      timestamp: new Date(),
    });

    this.finishMessage(message);
  }

  getChatId(uid1: string, uid2: string): string {
    return uid1.charAt(0) > uid2.charAt(0)
      ? `${uid1}-${uid2}`
      : `${uid2}-${uid1}`;
  }

  finishMessage(message: Message): void {
    this.message = '';

    this.database.sendMessage(message);
  }
  async handleFileInput(files: FileList) {
    if (files.length == 0 || !this.chatCardInfo) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size / 1000000 > 20) {
        this.eventEmitterService.showDialog(
          'File too big.',
          "Files can't be bigger than 20MB"
        );
        return;
      }
    }

    // TODO: Upload User Image on signup to firebase
    // TODO: Wait for the location to be fetch and then nav to /chat

    let receiverUid = this.chatCardInfo.senderUid;

    if (this.chatCardInfo.senderUid === this.me.uid) {
      receiverUid = this.chatCardInfo.receiverUid;
    }

    const uploads = {
      file: files,
      chatId: this.chatCardInfo.chatId,
      senderUid: this.me.uid,
      receiverUid: receiverUid,
    };

    this.dialog.open(UploadDialogComponent, {
      data: uploads,
    });
  }
}
