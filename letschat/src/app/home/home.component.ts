import { AuthService } from './../services/auth/auth.service';
import { DatabaseService } from './../services/database/database.service';
import { BottomPopupComponent } from './bottom-popup/bottom-popup.component';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../event-emitter.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private buttomSheet: MatBottomSheet,
    private eventEmitterService: EventEmitterService,
    private firestore: DatabaseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeBottomBarOpenFunction.subscribe(
        () => {
          this.openBottomSheet();
        }
      );

      this.eventEmitterService.subsVar = this.eventEmitterService.invokeBottomBarCloseFunction.subscribe(
        () => {
          this.closeBottomSheet();
        }
      );
    }
  }

  public closeBottomSheet(): void {
    this.buttomSheet.dismiss(BottomPopupComponent);
  }

  public openBottomSheet(): void {
    this.buttomSheet.open(BottomPopupComponent);
  }
}
