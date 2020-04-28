import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {OpportunitiesDetailsComponent} from './opportunities-details.component';

describe('OpportunitiesDetailsComponent', () => {
  let component: OpportunitiesDetailsComponent;
  let fixture: ComponentFixture<OpportunitiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpportunitiesDetailsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpportunitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
