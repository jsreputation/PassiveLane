import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MyDealPage} from './my-deal.page';

describe('MyDealPage', () => {
  let component: MyDealPage;
  let fixture: ComponentFixture<MyDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyDealPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
