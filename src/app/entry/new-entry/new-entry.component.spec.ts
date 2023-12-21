import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntryComponent } from './new-entry.component';
import {Observable} from "rxjs";
import {EntryService} from "../service/entry.service";

describe('NewEntryComponent', () => {
  let component: NewEntryComponent;
  let fixture: ComponentFixture<NewEntryComponent>;

  beforeEach(async () => {
    const mockEntryService = jasmine.createSpyObj('EntryService', ['addEntry']);
    mockEntryService.addEntry.and.returnValue(new Observable());

    await TestBed.configureTestingModule({
      imports: [NewEntryComponent],
      providers: [{
        provide: EntryService,
        useValue: mockEntryService
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
