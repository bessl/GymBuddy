import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetPage } from './add-set.page';

describe('AddSetPage', () => {
  let component: AddSetPage;
  let fixture: ComponentFixture<AddSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
