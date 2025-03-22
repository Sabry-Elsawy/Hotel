import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReviewComponent } from './all-review.component';

describe('AllReviewComponent', () => {
  let component: AllReviewComponent;
  let fixture: ComponentFixture<AllReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
