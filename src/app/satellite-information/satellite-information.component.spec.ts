import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteInformationComponent } from './satellite-information.component';

describe('SatelliteInformationComponent', () => {
  let component: SatelliteInformationComponent;
  let fixture: ComponentFixture<SatelliteInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SatelliteInformationComponent]
    });
    fixture = TestBed.createComponent(SatelliteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
