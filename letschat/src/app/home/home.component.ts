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
    private buttomSheet: MatBottomSheet,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    const isLoggedIn = (await this.auth.getUser()) !== null;

    if (isLoggedIn) {
      this.router.navigate(['/chat']);
    }
    this.eventEmitterService.onBottomBarOpenFunction.subscribe(() => {
      this.openBottomSheet();
    });

    this.eventEmitterService.onBottomBarCloseFunction.subscribe(() => {
      this.closeBottomSheet();
    });
  }

  public closeBottomSheet(): void {
    this.buttomSheet.dismiss(BottomPopupComponent);
  }

  public openBottomSheet(): void {
    this.buttomSheet.open(BottomPopupComponent);
  }
}
