import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFishStockingReportsComponent } from './all-fish-stocking-reports.component';

describe('AllFishStockingReportsComponent', () => {
  let component: AllFishStockingReportsComponent;
  let fixture: ComponentFixture<AllFishStockingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFishStockingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFishStockingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
