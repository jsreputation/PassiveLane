import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {TelecomRetailComponent} from './telecom-retail.component';

describe('TelecomRetailComponent', () => {
  let component: TelecomRetailComponent;
  let fixture: ComponentFixture<TelecomRetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelecomRetailComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TelecomRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
