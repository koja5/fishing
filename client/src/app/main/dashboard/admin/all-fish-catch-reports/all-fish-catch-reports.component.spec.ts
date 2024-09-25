import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFishCatchReportsComponent } from './all-fish-catch-reports.component';

describe('AllFishCatchReportsComponent', () => {
  let component: AllFishCatchReportsComponent;
  let fixture: ComponentFixture<AllFishCatchReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFishCatchReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFishCatchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
