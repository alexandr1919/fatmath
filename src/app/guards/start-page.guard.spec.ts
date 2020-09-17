import { TestBed } from '@angular/core/testing';

import { StartPageGuard } from './start-page.guard';

describe('StartPageGuard', () => {
  let guard: StartPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StartPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
