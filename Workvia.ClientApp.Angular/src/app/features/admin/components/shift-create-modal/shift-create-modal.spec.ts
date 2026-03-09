import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftCreateModal } from './shift-create-modal';

describe('ShiftCreateModal', () => {
  let component: ShiftCreateModal;
  let fixture: ComponentFixture<ShiftCreateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftCreateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftCreateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
