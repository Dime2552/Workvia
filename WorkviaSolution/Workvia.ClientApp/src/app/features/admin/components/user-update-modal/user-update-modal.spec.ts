import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateModal } from './user-update-modal';

describe('UserUpdateModal', () => {
  let component: UserUpdateModal;
  let fixture: ComponentFixture<UserUpdateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
