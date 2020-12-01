import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainencapsComponent } from './mainencaps.component';

describe('MainencapsComponent', () => {
  let component: MainencapsComponent;
  let fixture: ComponentFixture<MainencapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainencapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainencapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
