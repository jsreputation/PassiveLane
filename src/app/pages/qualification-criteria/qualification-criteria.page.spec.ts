import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {QualificationCriteriaPage} from './qualification-criteria.page';

describe('QualificationCriteriaPage', () => {
  let component: QualificationCriteriaPage;
  let fixture: ComponentFixture<QualificationCriteriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationCriteriaPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QualificationCriteriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
