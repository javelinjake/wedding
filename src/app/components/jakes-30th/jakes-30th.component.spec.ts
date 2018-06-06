import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Jakes30thComponent } from './jakes-30th.component';

describe('Jakes30thComponent', () => {
  let component: Jakes30thComponent;
  let fixture: ComponentFixture<Jakes30thComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Jakes30thComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Jakes30thComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
