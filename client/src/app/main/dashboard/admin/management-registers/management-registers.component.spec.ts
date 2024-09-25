import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementRegistersComponent } from './management-registers.component';

describe('ManagementRegistersComponent', () => {
  let component: ManagementRegistersComponent;
  let fixture: ComponentFixture<ManagementRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementRegistersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
