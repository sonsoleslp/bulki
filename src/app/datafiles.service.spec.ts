/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatafilesService } from './datafiles.service';

describe('Service: Datafiles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatafilesService]
    });
  });

  it('should ...', inject([DatafilesService], (service: DatafilesService) => {
    expect(service).toBeTruthy();
  }));
});
