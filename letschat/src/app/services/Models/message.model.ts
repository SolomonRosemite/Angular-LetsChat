export class Message {
  constructor({ chatId, sender, receiver, message, timestamp }) {
    this.chatId = chatId;
    this.message = message;
    this.receiverUid = receiver;
    this.senderUid = sender;
    this.timestamp = timestamp;
  }
  public readonly chatId: string;
  public readonly message: string;
  public readonly senderUid: string;
  public readonly receiverUid: string;
  public readonly timestamp: Date;

  public class?: string;
}
