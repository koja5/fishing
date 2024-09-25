import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdDamageReportDetailsComponent } from './bird-damage-report-details.component';

describe('BirdDamageReportDetailsComponent', () => {
  let component: BirdDamageReportDetailsComponent;
  let fixture: ComponentFixture<BirdDamageReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdDamageReportDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdDamageReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
