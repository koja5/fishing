import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOriginsComponent } from './all-origins.component';

describe('AllOriginsComponent', () => {
  let component: AllOriginsComponent;
  let fixture: ComponentFixture<AllOriginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOriginsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOriginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
