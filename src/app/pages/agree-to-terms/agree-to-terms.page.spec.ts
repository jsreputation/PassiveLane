import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AgreeToTermsPage} from './agree-to-terms.page';

describe('AgreeToTermsPage', () => {
  let component: AgreeToTermsPage;
  let fixture: ComponentFixture<AgreeToTermsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgreeToTermsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgreeToTermsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
