import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishStockingReportComponent } from './fish-stocking-report.component';

describe('FishStockingReportComponent', () => {
  let component: FishStockingReportComponent;
  let fixture: ComponentFixture<FishStockingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishStockingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishStockingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
