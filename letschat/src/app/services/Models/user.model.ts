export class User {
  constructor({ displayName, email, photoURL, location, uid }: User) {
    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.location = location;
    this.uid = uid;
  }
  displayName: string;
  email: string;
  photoURL: string;
  location: string;
  uid: string;
}
