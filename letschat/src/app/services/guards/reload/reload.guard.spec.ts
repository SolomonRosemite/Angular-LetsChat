import { TestBed } from '@angular/core/testing';

import { ReloadGuard } from './reload.guard';

describe('ReloadGuard', () => {
  let guard: ReloadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReloadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
