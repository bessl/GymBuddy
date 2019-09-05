import { TestBed, async, inject } from '@angular/core/testing';

import { CanEnterContentPageGuard } from './can-enter-content-page.guard';

describe('CanEnterContentPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanEnterContentPageGuard]
    });
  });

  it('should ...', inject([CanEnterContentPageGuard], (guard: CanEnterContentPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
