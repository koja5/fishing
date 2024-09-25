import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdCountReportDetailsComponent } from './bird-count-report-details.component';

describe('BirdCountReportDetailsComponent', () => {
  let component: BirdCountReportDetailsComponent;
  let fixture: ComponentFixture<BirdCountReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdCountReportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdCountReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
