import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MyDealMmTelecomRetailComponent} from './my-deal-mm-telecom-retail.component';

describe('MyDealMmTelecomRetailComponent', () => {
  let component: MyDealMmTelecomRetailComponent;
  let fixture: ComponentFixture<MyDealMmTelecomRetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealMmTelecomRetailComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDealMmTelecomRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
