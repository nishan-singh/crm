import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyEarningsComponent } from './yearly-earnings.component';

describe('YearlyEarningsComponent', () => {
  let component: YearlyEarningsComponent;
  let fixture: ComponentFixture<YearlyEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearlyEarningsComponent]
    });
    fixture = TestBed.createComponent(YearlyEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
