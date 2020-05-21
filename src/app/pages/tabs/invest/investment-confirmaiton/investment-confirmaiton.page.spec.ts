import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InvestmentConfirmaitonPage} from './investment-confirmaiton.page';

describe('InvestmentConfirmaitonPage', () => {
  let component: InvestmentConfirmaitonPage;
  let fixture: ComponentFixture<InvestmentConfirmaitonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentConfirmaitonPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentConfirmaitonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
