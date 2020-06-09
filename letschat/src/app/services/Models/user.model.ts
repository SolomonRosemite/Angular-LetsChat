export interface User {
  displayName: string;
  email: string;
  uid: string;
}

export class User {
  constructor(displayName: string, email: string, uid: string) {
    this.displayName = displayName;
    this.email = email;
    this.uid = uid;
  }
  displayName: string;
  email: string;
  uid: string;
}
