import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnswerComponent } from './all-answer.component';
import {provideHttpClient} from "@angular/common/http";

describe('AllAnswerComponent', () => {
  let component: AllAnswerComponent;
  let fixture: ComponentFixture<AllAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAnswerComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
