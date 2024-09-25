import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormFishCatchComponent } from './custom-form-fish-catch.component';

describe('CustomFormFishCatchComponent', () => {
  let component: CustomFormFishCatchComponent;
  let fixture: ComponentFixture<CustomFormFishCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormFishCatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormFishCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
