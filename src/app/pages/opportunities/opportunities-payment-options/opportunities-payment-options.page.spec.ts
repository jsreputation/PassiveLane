import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpportunitiesPaymentOptionsPage } from './opportunities-payment-options.page';

describe('OpportunitiesPaymentOptionsPage', () => {
  let component: OpportunitiesPaymentOptionsPage;
  let fixture: ComponentFixture<OpportunitiesPaymentOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunitiesPaymentOptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunitiesPaymentOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
