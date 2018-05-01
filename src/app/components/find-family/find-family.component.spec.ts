import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFamilyComponent } from './find-family.component';

describe('FindFamilyComponent', () => {
  let component: FindFamilyComponent;
  let fixture: ComponentFixture<FindFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
