import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFeedbackComponent } from './review-feedback.component';

describe('ReviewFeedbackComponent', () => {
  let component: ReviewFeedbackComponent;
  let fixture: ComponentFixture<ReviewFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewFeedbackComponent]
    });
    fixture = TestBed.createComponent(ReviewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
