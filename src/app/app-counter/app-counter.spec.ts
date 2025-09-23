import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCounter } from './app-counter';

describe('AppCounter', () => {
  let component: AppCounter;
  let fixture: ComponentFixture<AppCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
