import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpportunitiesYourInvestmentPage } from './opportunities-your-investment.page';

describe('OpportunitiesYourInvestmentPage', () => {
  let component: OpportunitiesYourInvestmentPage;
  let fixture: ComponentFixture<OpportunitiesYourInvestmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitiesYourInvestmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunitiesYourInvestmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
