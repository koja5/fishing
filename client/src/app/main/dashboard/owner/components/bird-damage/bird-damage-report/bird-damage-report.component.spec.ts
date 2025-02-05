import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirdDamageReportComponent } from './bird-damage-report.component';

describe('BirdDamageReportComponent', () => {
  let component: BirdDamageReportComponent;
  let fixture: ComponentFixture<BirdDamageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirdDamageReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirdDamageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
