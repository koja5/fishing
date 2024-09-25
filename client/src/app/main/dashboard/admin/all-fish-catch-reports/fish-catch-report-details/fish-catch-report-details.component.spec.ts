import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishCatchReportDetailsComponent } from './fish-catch-report-details.component';

describe('FishCatchReportDetailsComponent', () => {
  let component: FishCatchReportDetailsComponent;
  let fixture: ComponentFixture<FishCatchReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishCatchReportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishCatchReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
