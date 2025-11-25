import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftUpdateModal } from './shift-update-modal';

describe('ShiftUpdateModal', () => {
  let component: ShiftUpdateModal;
  let fixture: ComponentFixture<ShiftUpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftUpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftUpdateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
