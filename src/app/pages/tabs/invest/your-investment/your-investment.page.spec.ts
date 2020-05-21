import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {YourInvestmentPage} from './your-investment.page';

describe('YourInvestmentPage', () => {
  let component: YourInvestmentPage;
  let fixture: ComponentFixture<YourInvestmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YourInvestmentPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourInvestmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
