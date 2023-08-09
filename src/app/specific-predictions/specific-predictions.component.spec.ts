import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPredictionsComponent } from './specific-predictions.component';

describe('SpecificPredictionsComponent', () => {
  let component: SpecificPredictionsComponent;
  let fixture: ComponentFixture<SpecificPredictionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificPredictionsComponent]
    });
    fixture = TestBed.createComponent(SpecificPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
