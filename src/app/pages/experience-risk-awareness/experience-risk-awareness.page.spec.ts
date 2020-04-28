import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ExperienceRiskAwarenessPage} from './experience-risk-awareness.page';

describe('ExperienceRiskAwarenessPage', () => {
  let component: ExperienceRiskAwarenessPage;
  let fixture: ComponentFixture<ExperienceRiskAwarenessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceRiskAwarenessPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceRiskAwarenessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
