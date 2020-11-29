import { TestBed } from '@angular/core/testing';

import { ChathistoryService } from './chathistory.service';

describe('ChathistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChathistoryService = TestBed.get(ChathistoryService);
    expect(service).toBeTruthy();
  });
});
