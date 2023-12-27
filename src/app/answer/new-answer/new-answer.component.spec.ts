import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnswerComponent } from './new-answer.component';
import {provideHttpClient} from "@angular/common/http";

describe('NewAnswerComponent', () => {
  let component: NewAnswerComponent;
  let fixture: ComponentFixture<NewAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAnswerComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
