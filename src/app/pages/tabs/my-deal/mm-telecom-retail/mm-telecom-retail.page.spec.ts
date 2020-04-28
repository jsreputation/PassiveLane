import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MmTelecomRetailPage} from './mm-telecom-retail.page';

describe('MmTelecomRetailPage', () => {
  let component: MmTelecomRetailPage;
  let fixture: ComponentFixture<MmTelecomRetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MmTelecomRetailPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MmTelecomRetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
