import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStockingReportDetailsComponent } from './fish-stocking-report-details.component';

describe('FishStockingReportDetailsComponent', () => {
  let component: FishStockingReportDetailsComponent;
  let fixture: ComponentFixture<FishStockingReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStockingReportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStockingReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
