import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBirdDamageReportsComponent } from './all-bird-damage-reports.component';

describe('AllBirdDamageReportsComponent', () => {
  let component: AllBirdDamageReportsComponent;
  let fixture: ComponentFixture<AllBirdDamageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBirdDamageReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBirdDamageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
