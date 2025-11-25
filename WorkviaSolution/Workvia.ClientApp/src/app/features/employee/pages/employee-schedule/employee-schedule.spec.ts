import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSchedule } from './employee-schedule';

describe('EmployeeSchedule', () => {
  let component: EmployeeSchedule;
  let fixture: ComponentFixture<EmployeeSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSchedule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSchedule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
