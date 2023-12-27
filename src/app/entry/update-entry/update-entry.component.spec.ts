import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEntryComponent } from './update-entry.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {provideHttpClient} from "@angular/common/http";

describe('UpdateEntryComponent', () => {
  let component: UpdateEntryComponent;
  let fixture: ComponentFixture<UpdateEntryComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      queryParamMap: of({
        has: (param: string) => param === 'entryId',
        get: (param: string) => param === 'entryId' ? 'your_entry_id_value' : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [UpdateEntryComponent],
      providers: [
        provideHttpClient(),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
