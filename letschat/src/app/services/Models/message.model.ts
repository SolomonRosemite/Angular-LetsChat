export class Message {
  constructor({
    chatId,
    sender,
    receiver,
    message,
    timestamp,
    senderDisplayName,
    receiverDisplayName,
    receiverPhotoURL,
    senderPhotoURL,
  }) {
    this.chatId = chatId;
    this.message = message;
    this.senderUid = sender;
    this.receiverUid = receiver;
    this.senderDisplayName = senderDisplayName;
    this.receiverDisplayName = receiverDisplayName;
    this.receiverPhotoURL = receiverPhotoURL;
    this.senderPhotoURL = senderPhotoURL;
    this.timestamp = timestamp;
  }
  public readonly chatId: string;
  public readonly message: string;

  public readonly receiverDisplayName: string;
  public readonly receiverUid: string;
  public readonly receiverPhotoURL: string;

  public readonly senderUid: string;
  public readonly senderPhotoURL: string;
  public readonly senderDisplayName: string;

  public readonly timestamp: Date;

  public class?: string;
}
