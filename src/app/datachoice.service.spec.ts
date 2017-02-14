/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatachoiceService } from './datachoice.service';

describe('Service: Datachoice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatachoiceService]
    });
  });

  it('should ...', inject([DatachoiceService], (service: DatachoiceService) => {
    expect(service).toBeTruthy();
  }));
});
