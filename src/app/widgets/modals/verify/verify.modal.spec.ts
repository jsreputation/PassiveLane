import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyModal } from './verify.modal';

describe('VerifyComponent', () => {
  let component: VerifyModal;
  let fixture: ComponentFixture<VerifyModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyModal ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
