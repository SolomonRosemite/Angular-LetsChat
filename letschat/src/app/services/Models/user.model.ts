export interface User {
  displayName: string;
  photoURL: string;
  email: string;
  uid: string;
}

export class User {
  constructor({ displayName, email, photoURL, uid }: User) {
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.uid = uid;
  }
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}
