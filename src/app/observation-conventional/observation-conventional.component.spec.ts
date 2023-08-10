import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationConventionalComponent } from './observation-conventional.component';

describe('ObservationConventionalComponent', () => {
  let component: ObservationConventionalComponent;
  let fixture: ComponentFixture<ObservationConventionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationConventionalComponent]
    });
    fixture = TestBed.createComponent(ObservationConventionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
