import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePdfReportComponent } from './generate-pdf-report.component';

describe('GeneratePdfReportComponent', () => {
  let component: GeneratePdfReportComponent;
  let fixture: ComponentFixture<GeneratePdfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePdfReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratePdfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
