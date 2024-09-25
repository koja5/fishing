import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllObservationSheetsComponent } from './all-observation-sheets.component';

describe('AllObservationSheetsComponent', () => {
  let component: AllObservationSheetsComponent;
  let fixture: ComponentFixture<AllObservationSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllObservationSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllObservationSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
