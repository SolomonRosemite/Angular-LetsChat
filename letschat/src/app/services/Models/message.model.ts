export class Message {
  constructor({ chatId, date, sender, receiver, message }) {
    this.chatId = chatId;
    this.date = date;
    this.message = message;
    this.receiverUid = receiver;
    this.senderUid = sender;
  }
  public readonly chatId: string;
  public readonly date: Date;
  public readonly message: string;
  public readonly senderUid: string;
  public readonly receiverUid: string;

  public class?: string;
}
