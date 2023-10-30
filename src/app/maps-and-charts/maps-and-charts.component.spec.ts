import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsAndChartsComponent } from './maps-and-charts.component';

describe('MapsAndChartsComponent', () => {
  let component: MapsAndChartsComponent;
  let fixture: ComponentFixture<MapsAndChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapsAndChartsComponent]
    });
    fixture = TestBed.createComponent(MapsAndChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
