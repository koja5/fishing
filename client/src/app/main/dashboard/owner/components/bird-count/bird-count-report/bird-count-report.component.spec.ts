import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdCountReportComponent } from './bird-count-report.component';

describe('BirdCountReportComponent', () => {
  let component: BirdCountReportComponent;
  let fixture: ComponentFixture<BirdCountReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdCountReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdCountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
