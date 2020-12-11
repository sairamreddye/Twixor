import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEncapsComponent } from './create-encaps.component';

describe('CreateEncapsComponent', () => {
  let component: CreateEncapsComponent;
  let fixture: ComponentFixture<CreateEncapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEncapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEncapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
