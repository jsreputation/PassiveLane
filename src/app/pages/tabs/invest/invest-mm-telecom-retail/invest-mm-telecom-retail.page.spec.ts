import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {InvestMmTelecomRetailPage} from './invest-mm-telecom-retail.page';

describe('InvestMmTelecomRetailPage', () => {
  let component: InvestMmTelecomRetailPage;
  let fixture: ComponentFixture<InvestMmTelecomRetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvestMmTelecomRetailPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestMmTelecomRetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
