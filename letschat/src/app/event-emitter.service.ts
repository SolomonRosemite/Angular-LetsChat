import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  invokeBottomBarOpenFunction = new EventEmitter();
  invokeBottomBarCloseFunction = new EventEmitter();
  invokeOpenPopupDialogFunction = new EventEmitter<any>();
  invokeClosePopupDialogFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() {}

  onBottomBarClickClose(): void {
    this.invokeBottomBarCloseFunction.emit();
  }

  onBottomBarClickOpen(): void {
    this.invokeBottomBarOpenFunction.emit();
  }

  showDialog(title: string, text: string): void {
    const data = [title, text];
    this.invokeOpenPopupDialogFunction.emit(data);
  }

  closeDialog(): void {
    this.invokeClosePopupDialogFunction.emit();
  }
}
