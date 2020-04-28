import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MyDealBarchartComponent} from './my-deal-barchart.component';

describe('MyDealBarchartComponent', () => {
  let component: MyDealBarchartComponent;
  let fixture: ComponentFixture<MyDealBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealBarchartComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDealBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
