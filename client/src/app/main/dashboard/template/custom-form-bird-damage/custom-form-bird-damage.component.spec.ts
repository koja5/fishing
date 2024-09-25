import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormBirdDamageComponent } from './custom-form-bird-damage.component';

describe('CustomFormBirdDamageComponent', () => {
  let component: CustomFormBirdDamageComponent;
  let fixture: ComponentFixture<CustomFormBirdDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormBirdDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFormBirdDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
