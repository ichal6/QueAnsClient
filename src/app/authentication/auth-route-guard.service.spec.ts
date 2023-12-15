import { TestBed } from '@angular/core/testing';

import { AuthRouteGuardService } from './auth-route-guard.service';
import {AuthService} from "./auth.service";

describe('AuthRouteGuardService', () => {
  let service: AuthRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: AuthService,
        useValue: jasmine.createSpyObj('AuthService', ['logout'])
      }]
    });
    service = TestBed.inject(AuthRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
