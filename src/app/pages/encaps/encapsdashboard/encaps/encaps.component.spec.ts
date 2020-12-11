import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncapsComponent } from './encaps.component';

describe('EncapsComponent', () => {
  let component: EncapsComponent;
  let fixture: ComponentFixture<EncapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
