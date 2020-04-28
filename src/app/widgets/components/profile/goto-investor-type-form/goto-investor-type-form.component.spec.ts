import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GotoInvestorTypeFormComponent } from './goto-investor-type-form.component';

describe('GotoInvestorTypeFormComponent', () => {
  let component: GotoInvestorTypeFormComponent;
  let fixture: ComponentFixture<GotoInvestorTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotoInvestorTypeFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GotoInvestorTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
