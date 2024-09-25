import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishCatchComponent } from './fish-catch.component';

describe('FishCatchComponent', () => {
  let component: FishCatchComponent;
  let fixture: ComponentFixture<FishCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishCatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FishCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
