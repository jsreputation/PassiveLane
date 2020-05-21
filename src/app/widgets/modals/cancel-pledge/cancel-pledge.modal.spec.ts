import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {CancelPledgeComponent} from './cancel-pledge.modal';

describe('CancelPledgeComponent', () => {
  let component: CancelPledgeComponent;
  let fixture: ComponentFixture<CancelPledgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelPledgeComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelPledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
