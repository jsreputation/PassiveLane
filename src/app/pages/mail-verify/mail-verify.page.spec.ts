import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailVerifyPage } from './mail-verify.page';

describe('MailVerifyPage', () => {
  let component: MailVerifyPage;
  let fixture: ComponentFixture<MailVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailVerifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
