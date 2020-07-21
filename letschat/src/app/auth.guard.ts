import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth/auth.service';
import { tap, map, take } from 'rxjs/operators';
import { EventEmitterService } from './services/event/event-emitter.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private eventEmitterService: EventEmitterService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (next.url[0].path == 'chat') {
      if (next.url[0].path && this.eventEmitterService.didReloadChat != true) {
        const url = 'http://localhost:4200/chat'; // todo: Remove hardcoded variable
        window.open(url, '_self');

        this.eventEmitterService.didReloadChat = true;
      } else {
        this.eventEmitterService.didReloadChat = false;
      }
    }

    return this.auth.user$.pipe(
      take(1),
      map((user) => !!user), // <-- map to boolean
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
