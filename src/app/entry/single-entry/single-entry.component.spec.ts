import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEntryComponent } from './single-entry.component';
import createSpyObj = jasmine.createSpyObj;
import {AuthService} from "../../authentication/auth.service";
import {Entry} from "../model/entry";

describe('SingleEntryComponent', () => {
  let component: SingleEntryComponent;
  let fixture: ComponentFixture<SingleEntryComponent>;

  beforeEach(async () => {
    const mockAuthService = createSpyObj('AuthService', ['_isAuthenticated'])
    mockAuthService._isAuthenticated.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [SingleEntryComponent],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleEntryComponent);
    component = fixture.componentInstance;
    component.entry = new Entry('id', [], []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
