export class Message {
  constructor(
    chatId: string,
    date: Date,
    sender: string,
    receiver: string,
    message: string
  ) {
    this.chatId = chatId;
    this.date = date;
    this.message = message;
    this.receiver = receiver;
    this.sender = sender;
  }
  public readonly chatId: string;
  public readonly date: Date;
  public readonly message: string;
  public readonly sender: string;
  public readonly receiver: string;
}
