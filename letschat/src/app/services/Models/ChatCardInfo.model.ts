export class ChatCardInfo {
  constructor({
    displayName,
    chatId,
    senderUid,
    receiverUid,
    photoURL,
    latestMessage,
    date: lastSeen,
  }: ChatCardInfo) {
    this.displayName = displayName;
    this.chatId = chatId;
    this.senderUid = senderUid;
    this.receiverUid = receiverUid;
    this.photoURL = photoURL;
    this.date = lastSeen;
    this.latestMessage = latestMessage;
  }

  readonly displayName: string;
  readonly chatId: string;
  readonly photoURL: string;
  readonly receiverUid: string;
  readonly senderUid: string;
  date: string;
  latestMessage: string;
}
