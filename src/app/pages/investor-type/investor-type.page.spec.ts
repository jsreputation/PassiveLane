import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InvestorTypePage} from './investor-type.page';

describe('InvestorTypePage', () => {
  let component: InvestorTypePage;
  let fixture: ComponentFixture<InvestorTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestorTypePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestorTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
