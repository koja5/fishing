import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishCatchReportComponent } from './fish-catch-report.component';

describe('FishCatchReportComponent', () => {
  let component: FishCatchReportComponent;
  let fixture: ComponentFixture<FishCatchReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishCatchReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishCatchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
