import { Router } from '@angular/router';
import { DatabaseService } from './../../../services/database/database.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/services/Models/user.model';
import { Message } from 'src/app/services/Models/message.model';

@Component({
  selector: 'app-add-messenger-dialog',
  templateUrl: './add-messenger-dialog.component.html',
  styleUrls: ['./add-messenger-dialog.component.scss'],
})
export class AddMessengerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddMessengerDialogComponent>,
    private database: DatabaseService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: User[]
  ) {
    this.receiver = data[0];
    this.me = data[1];
  }

  me: User;
  receiver: User;

  public message = '';

  location(): string {
    return this.receiver.location.length !== 0
      ? `From: ${this.receiver.location}`
      : '';
  }

  async sendMessage(event): Promise<void> {
    if ((event != null && event.keyCode !== 13) || this.message.length === 0) {
      return;
    }

    const message = new Message({
      chatId: this.getChatId(this.me.uid, this.receiver.uid),
      message: this.message,
      timestamp: new Date(),

      sender: this.me.uid,
      senderPhotoURL: this.me.photoURL,
      senderDisplayName: this.me.displayName,

      receiver: this.receiver.uid,
      receiverPhotoURL: this.receiver.photoURL,
      receiverDisplayName: this.receiver.displayName,
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

    this.database.sendMessage(message).then(() => {
      this.close();

      this.router.navigate(['/chat']);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
