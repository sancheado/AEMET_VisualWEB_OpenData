import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaTestComponent } from './prueba-test.component';

describe('PruebaTestComponent', () => {
  let component: PruebaTestComponent;
  let fixture: ComponentFixture<PruebaTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PruebaTestComponent]
    });
    fixture = TestBed.createComponent(PruebaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
