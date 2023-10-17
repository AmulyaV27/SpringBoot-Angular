import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEntitledComponent } from './not-entitled.component';

describe('NotEntitledComponent', () => {
  let component: NotEntitledComponent;
  let fixture: ComponentFixture<NotEntitledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotEntitledComponent]
    });
    fixture = TestBed.createComponent(NotEntitledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
