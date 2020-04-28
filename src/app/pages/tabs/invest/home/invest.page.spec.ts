import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InvestPage} from './invest.page';

describe('InvestPage', () => {
  let component: InvestPage;
  let fixture: ComponentFixture<InvestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
