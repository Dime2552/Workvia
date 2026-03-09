import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeModal } from './password-change-modal';

describe('PasswordChangeModal', () => {
  let component: PasswordChangeModal;
  let fixture: ComponentFixture<PasswordChangeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordChangeModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordChangeModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
