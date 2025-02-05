import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationSheetReportComponent } from './observation-sheet-report.component';

describe('ObservationSheetReportComponent', () => {
  let component: ObservationSheetReportComponent;
  let fixture: ComponentFixture<ObservationSheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationSheetReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationSheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
