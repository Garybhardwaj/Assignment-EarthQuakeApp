import { TestBed, inject } from '@angular/core/testing';

import { GeoService } from './geo.service';
import { Injectable } from '@angular/core';

describe('GeoService', () => {
  let injectableService: Injectable;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Injectable]
    });
    injectableService = TestBed.get(Injectable);
  });

  it('should be created', inject(
    [Injectable], (injectService: Injectable) => {
      expect(injectService).toBe(injectableService);
    }
  ));
});
