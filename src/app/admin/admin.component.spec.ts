import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import {AuthService} from "../authentication/auth.service";
import {EntryService} from "../entry/service/entry.service";
import {Observable} from "rxjs";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    const mockEntryService = jasmine.createSpyObj('EntryService', ['getEntries']);
    mockEntryService.getEntries.and.returnValue(new Observable());

    await TestBed.configureTestingModule({
      imports: [AdminComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['logout'])
      },
        {
          provide: EntryService,
          useValue: mockEntryService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
