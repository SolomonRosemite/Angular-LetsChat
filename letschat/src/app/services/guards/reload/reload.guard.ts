import { EventEmitterService } from './../../event/event-emitter.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ReloadGuard implements CanActivate {
  constructor(private eventEmitter: EventEmitterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.eventEmitter.didReloadChat != true) {
      const url = `${window.location.origin}/chat`;
      window.open(url, '_self');

      this.eventEmitter.didReloadChat = true;
      return false;
    } else {
      this.eventEmitter.didReloadChat = false;
      return true;
    }
  }
}
