import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstnameListComponent } from './firstname-list.component';

describe('FirstnameListComponent', () => {
  let component: FirstnameListComponent;
  let fixture: ComponentFixture<FirstnameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstnameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstnameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
