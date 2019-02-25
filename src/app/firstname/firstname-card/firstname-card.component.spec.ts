import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstnameCardComponent } from './firstname-card.component';

describe('FirstnameCardComponent', () => {
  let component: FirstnameCardComponent;
  let fixture: ComponentFixture<FirstnameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstnameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstnameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
