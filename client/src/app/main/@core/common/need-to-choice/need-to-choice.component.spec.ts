import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedToChoiceComponent } from './need-to-choice.component';

describe('NeedToChoiceComponent', () => {
  let component: NeedToChoiceComponent;
  let fixture: ComponentFixture<NeedToChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedToChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedToChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
