import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { BottomPopupComponent } from './bottom-popup/bottom-popup.component';
import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from '../services/event/event-emitter.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private bottomSheet: MatBottomSheet,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnInit(): void {
    this.eventEmitterService.onBottomBarOpenFunction.subscribe(() => {
      this.openBottomSheet();
    });

    this.eventEmitterService.onBottomBarCloseFunction.subscribe(() => {
      this.closeBottomSheet();
    });
  }

  public closeBottomSheet(): void {
    this.bottomSheet.dismiss(BottomPopupComponent);
  }

  public openBottomSheet(): void {
    this.bottomSheet.open(BottomPopupComponent);
  }
}
