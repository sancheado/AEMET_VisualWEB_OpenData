import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyClimatologiesComponent } from './daily-climatologies.component';

describe('DailyClimatologiesComponent', () => {
  let component: DailyClimatologiesComponent;
  let fixture: ComponentFixture<DailyClimatologiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyClimatologiesComponent]
    });
    fixture = TestBed.createComponent(DailyClimatologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
