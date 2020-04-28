import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InvestmentAmountPage} from './investment-amount.page';

describe('InvestmentAmountPage', () => {
  let component: InvestmentAmountPage;
  let fixture: ComponentFixture<InvestmentAmountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentAmountPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentAmountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
