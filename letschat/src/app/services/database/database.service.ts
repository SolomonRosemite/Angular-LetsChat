import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  getData<T>(path: string): Observable<T[]> {
    return this.firestore.collection<T>(path).valueChanges();
  }
}
