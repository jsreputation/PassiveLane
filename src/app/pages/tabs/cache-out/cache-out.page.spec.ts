import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CashOutPage} from './cache-out.page';

describe('CashOutPage', () => {
  let component: CashOutPage;
  let fixture: ComponentFixture<CashOutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CashOutPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
