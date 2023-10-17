import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAllFeedbackComponent } from './admin-view-all-feedback.component';

describe('AdminViewAllFeedbackComponent', () => {
  let component: AdminViewAllFeedbackComponent;
  let fixture: ComponentFixture<AdminViewAllFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewAllFeedbackComponent]
    });
    fixture = TestBed.createComponent(AdminViewAllFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
