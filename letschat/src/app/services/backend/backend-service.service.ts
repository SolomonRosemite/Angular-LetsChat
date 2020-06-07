import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  constructor(private firestore: AngularFirestore) {}

  getData(args: string): Observable<any> {
    return this.firestore.collection(args).valueChanges();
  }
}
