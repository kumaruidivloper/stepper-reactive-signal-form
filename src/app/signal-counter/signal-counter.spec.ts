import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalCounter } from './signal-counter';

describe('SignalCounter', () => {
  let component: SignalCounter;
  let fixture: ComponentFixture<SignalCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignalCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
